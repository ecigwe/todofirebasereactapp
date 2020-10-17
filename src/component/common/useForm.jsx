import Joi from "joi-browser";
import React, { useState, useEffect } from "react";

function FormData() {
  const [error, setError] = useState({});
  const [input, setInput] = useState({ name: "" });
  let schema = {
    name: Joi.string().required().label("Input"),
  };
  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);

    if (!error) return null;
    return error.details[0].message;
  };
  const validate = () => {
    let options = {
      abortEarly: false,
    };
    const { error } = Joi.validate(input, schema, options);

    if (!error) return null;
    let errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    //const username = this.username.current.value;

    let errors = this.validate();
    console.log(errors);
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit();
  };
  const handleChange = ({ currentTarget: input }) => {
    let errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    let data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };
  return [validate, input, error];
}

export default FormData;
