import React, { useState } from "react";
import List from "@material-ui/core/List";
import {
  ListItem,
  Button,
  Modal,
  FormControl,
  Input,
  InputLabel,
} from "@material-ui/core";

import ListItemText from "@material-ui/core/ListItemText";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { db } from "../firebase";
import { makeStyles } from "@material-ui/core/styles";
import "../css/todo.css";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Todo(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState(props.item.todo);
  const [modalStyle] = useState(getModalStyle);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const updateTodo = () => {
    db.collection("todo")
      .doc(props.item.id)
      .set({ todo: input }, { merge: true });
    setOpen(false);
  };
  return (
    <div>
      <div className="todo">
        <Modal
          open={open}
          onClose={(e) => setOpen(false)}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div style={modalStyle} className={classes.paper}>
            <h1>update todo</h1>
            <FormControl>
              <InputLabel htmlFor="my-input"> update todo </InputLabel>{" "}
              <InputLabel htmlFor="my-input"> update todo </InputLabel>{" "}
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={props.item.todo}
              />
              {/* <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={props.item.todo}
              /> */}
              <Button
                variant="contained"
                color="primary"
                onClick={(e) => {
                  updateTodo();
                  setOpen(false);
                }}
              >
                Update
              </Button>
            </FormControl>
          </div>
        </Modal>

        <List>
          <ListItem>
            <ListItemText primary={props.item.todo} />
            <DeleteForeverIcon
              onClick={(e) => db.collection("todo").doc(props.item.id).delete()}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={(e) => setOpen(true)}
            >
              edit
            </Button>
          </ListItem>
        </List>
      </div>
    </div>
  );
}

export default Todo;
