import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import { Button, FormControl } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { db } from "../firebase";
import firebase from "firebase";

const schema = yup.object().shape({
  name: yup.string().required(),
});

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

function Formval() {
  const classes = useStyles();
  let [input, setInput] = useState({ name: "" });

  const [todo, setTodo] = useState([]);
  let [error, setError] = useState({});
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const handleChange = ({ currentTarget: input }) => {
    // e.preventDefault();

    let data = { ...input };

    data[input.name] = input.value;

    setInput(data);
  };
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

  const handleAddTodo = (e) => {
    e.preventDefault();
    // let errors = validate();
    // console.log(errors);
    // setError(errors || {});

    // if (errors) return;

    // setTodo([...todo, input]);

    setInput({ name: "" });
  };
  const onSubmit = (data) => {
    console.log(data);

    db.collection("todo").add({
      todo: data.name,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    // setTodo([...todo, data]);
    setInput({ name: "" });
  };

  return (
    <div>
      <h1>helloworld</h1>

      <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
        <TextField
          id="name"
          label="name"
          type="text"
          name="name"
          inputRef={register()}
          value={input.name}
          onChange={handleChange}
        />
        {/* <button type="submit">add todo</button> */}
        <div>
          {" "}
          <Button variant="contained" color="primary" type="submit">
            Primary
          </Button>
        </div>
      </form>
      {errors.name && <div>{errors.name.message}</div>}

      {todo.map((item) => {
        return <div>{item.todo}</div>;
      })}
    </div>
  );
}

export default Formval;
