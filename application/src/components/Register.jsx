import { Form, Button, Alert } from "react-bootstrap";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import facade from "../facade";
import { Col, Row } from "react-bootstrap";

export default function Register({ setLoggedIn }) {
  const history = useHistory();
  const init = {
    username: "",
    password: "",
    verifyPassword: "",
    firstname: "",
    lastname: "",
  };
  const [userCredentials, setUserCredentials] = useState(init);
  const [error, setError] = useState(null);

  const performRegistration = (event) => {
    event.preventDefault();

    setError(null);

    if (
      userCredentials.username !== "" &&
      userCredentials.password !== "" &&
      userCredentials.verifyPassword !== "" &&
      userCredentials.firstname !== "" &&
      userCredentials.lastname !== ""
    ) {
      if (userCredentials.password !== userCredentials.verifyPassword) {
        setError("The passwords are not the same.");
        return;
      }

      facade
        .register(
          userCredentials.username,
          userCredentials.password,
          userCredentials.firstname,
          userCredentials.lastname
        )
        .then(() => {
          setLoggedIn(true);
          history.push("/CA3/");
        })
        .catch((err) => {
          if (err.status) {
            err.fullError.then((e) => setError(e.message));
          }

          setError("An error occurred while processing your request.");
        });
    } else {
      setError(
        "All fields are mandatory, please verify you have provided all of the requested details."
      );
    }
  };

  const onChange = (event) => {
    setUserCredentials({
      ...userCredentials,
      [event.target.id]: event.target.value,
    });
  };

  return (
    <>
      <h2>NewBiz Fan Club - Register</h2>
      <Form onChange={onChange}>
        <Form.Group>
          <Form.Label>Firstname</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your firstname"
            id="firstname"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Lastname</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your lastname"
            id="lastname"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your username"
            id="username"
          />
        </Form.Group>

        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                id="password"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Verify Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Verify your password"
                id="verifyPassword"
              />
            </Form.Group>
          </Col>
        </Row>

        {error && <Alert variant="danger">{error}</Alert>}

        <Button variant="primary" type="submit" onClick={performRegistration}>
          Register New User
        </Button>
      </Form>
    </>
  );
}
