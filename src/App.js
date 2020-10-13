import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import { FormControl, Input, InputLabel } from "@material-ui/core";
import Todo from "./component/Todo";
import { db } from "./firebase";
import firebase from "firebase";

import "./App.css";
import { DeleteForeverIcon } from "@material-ui/icons/DeleteForever";

function App() {
  const [todo, setTodo] = useState([]);
  const [input, setInput] = useState("");

  //run once when the app refresh is load
  // https://todoapp-97362.web.app/

  useEffect(() => {
    db.collection("todo")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        console.log(snapshot.docs.map((doc) => doc.data()));
        setTodo(
          snapshot.docs.map((doc) => {
            return { id: doc.id, todo: doc.data().todo };
          })
        );
      });
  }, []);

  const addTodo = (event) => {
    event.preventDefault();
    db.collection("todo").add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    // setTodo([...todo, input]);
    setInput("");
  };
  return (
    <div className="App">
      <>
        <h1> hello todo </h1>
        <FormControl>
          <InputLabel htmlFor="my-input"> add todo </InputLabel>{" "}
          <Input
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
            }}
          />{" "}
          <Button
            disabled={!input}
            variant="contained"
            color="primary"
            onClick={addTodo}
          >
            add todo{" "}
          </Button>{" "}
        </FormControl>
        {todo.map((item) => {
          return <Todo item={item} />;
        })}{" "}
      </>{" "}
    </div>
  );
}

export default App;
