import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import { FormControl, Input, InputLabel } from "@material-ui/core";
import Todo from "./component/Todo";
import { db } from "./firebase";
import firebase from "firebase";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import "./App.css";
import { DeleteForeverIcon } from "@material-ui/icons/DeleteForever";

function App() {
  const [todo, setTodo] = useState([]);
  const [input, setInput] = useState({ name: "" });
  const schema = yup.object().shape({
    name: yup.string().required(),
  });
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const handleChange = ({ currentTarget: input }) => {
    // e.preventDefault();

    let data = { ...input };

    data[input.name] = input.value;

    setInput(data);
  };

  //run once when the app refresh is load
  // https://todoapp-97362.web.app/

  useEffect(() => {
    db.collection("todo")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        console.log(snapshot.docs.map((doc) => doc.data()));
        setTodo(
          snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              todo: doc.data().todo,
            };
          })
        );
      });
  }, []);
  const onSubmit = (data) => {
    console.log(data);

    db.collection("todo").add({
      todo: data.name,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    // setTodo([...todo, data]);
    setInput({ name: "" });
  };

  // const addTodo = (event) => {
  //   event.preventDefault();
  //   db.collection("todo").add({
  //     todo: input,
  //     timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  //   });
  //   // setTodo([...todo, input]);
  //   setInput("");
  // };
  return (
    <div className="App">
      <>
        <h1> hello todo </h1>{" "}
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputLabel htmlFor="my-input"> add todo </InputLabel>{" "}
          <Input
            value={input.name}
            name="name"
            onChange={handleChange}
            inputRef={register()}
          />{" "}
          {errors.name && <div>{errors.name.message}</div>}
          <Button
            // disabled={!input.name}
            variant="contained"
            color="primary"
            type="submit"
          >
            add todo{" "}
          </Button>{" "}
        </form>{" "}
        {todo.map((item) => {
          return <Todo item={item} />;
        })}{" "}
      </>{" "}
    </div>
  );
}

export default App;
