import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { login } from "../../services/auth";
import { loginThunk } from "../../store/auth"
import "./LoginForm.css"
import { arMA } from "date-fns/locale";

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const theUser = useSelector(state => state.currentUser.id)

  const dispatch = useDispatch()

  const onLogin = async (e) => {
    e.preventDefault();
    // const user = await login(email, password);
    dispatch(loginThunk(email, password))
    // if (!user.errors) {
    //   setAuthenticated(true);
    // } else {
    //   setErrors(user.errors);
    // }
  };

  const demoClick = async (e) => {
    e.preventDefault()
    dispatch(loginThunk("demo@aa.io", "password"))
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (theUser) {
    return <Redirect to="/" />;
  }

  return (
    <Form onSubmit={onLogin}>
      <div>
        {errors.map((error) => (
          <div>{error}</div>
        ))}
      </div>
      <div className="login-form">
        <div>
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
          className="login-email"
            name="email"
            type="text"
            placeholder="Email"
            value={email}
            onChange={updateEmail}
          />
        </div>
        <div>
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
          className="login-password"
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={updatePassword}
          />
          <Button className="m-2" variant="dark" type="submit">Login</Button>
          <Button className="m-2" variant="dark" type="submit" onClick={demoClick}>Demo</Button>
        </div>
      </div>
    </Form>
  );
};

export default LoginForm;
