import { Form, Button, Alert } from "react-bootstrap";
import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import facade from "../facade";

export default function Login({ setLoggedIn }) {
  const { state } = useLocation();
  const pageAfterLogin = state ? state.from : "/CA3/";
  const history = useHistory();
  const init = { username: "", password: "" };
  const [loginCredentials, setLoginCredentials] = useState(init);
  const [error, setError] = useState(null);

  const performLogin = (event) => {
    event.preventDefault();

    setError(null);

    if (loginCredentials.username !== "" && loginCredentials.password !== "") {
      facade
        .login(loginCredentials.username, loginCredentials.password)
        .then(() => {
          setLoggedIn(true);
          history.push(pageAfterLogin);
        })
        .catch((err) => {
          if (err.status) {
            err.fullError.then((e) => setError(e.message));
          }

          setError("An error occurred while processing your request.");
        });
    } else {
      setError("Username and/or password is missing!");
    }
  };

  const onChange = (event) => {
    setLoginCredentials({
      ...loginCredentials,
      [event.target.id]: event.target.value,
    });
  };

  return (
    <>
      <h2>NewBiz Fan Club - Login</h2>
      <Form onChange={onChange}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            id="username"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" id="password" />
        </Form.Group>

        {error && <Alert variant="danger">{error}</Alert>}

        <Button variant="primary" type="submit" onClick={performLogin}>
          Login
        </Button>
      </Form>
    </>
  );
}
