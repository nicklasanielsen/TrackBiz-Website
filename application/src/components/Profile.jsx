import { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import facade from "../facade";
import { Col, Row, Container, Button, Form } from "react-bootstrap";
import tokenFacade from "../helperFacades/TokenFacade";

export default function Profile() {
  const [getProfile, setProfile] = useState("Loading..");
  const [error, setError] = useState(null);
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

  const killUser = () => facade.deleteUser();

  const editUser = (event) => {
    event.preventDefault();
    facade
      .editUser(username, firstName, lastName, password)
      .then((data) => {
        tokenFacade.setToken(data.token);
        window.location.reload();
      })

      .catch((err) => {
        if (err.status) {
          err.fullError.then((e) => setError(e.message));
        }

        setError("An error occurred...");
      });
  };

  const onChange = (event) => {
    if (event.target.id === "username") {
      setUsername(event.target.value);
    }
    if (event.target.id === "firstname") {
      setFirstName(event.target.value);
    }
    if (event.target.id === "lastname") {
      setLastName(event.target.value);
    }
    if (event.target.id === "password") {
      setPassword(event.target.value);
    }
  };

  useEffect(() => {
    facade
      .getProfile()
      .then((profile) => {
        setProfile(
          <div>
            <Row>
              <h2>User Information</h2>
            </Row>
            <Row>
              <Col>
                <li key="username">Username: {profile.userName}</li>
                <li key="fullname">Fullname: {profile.fullName}</li>
                <li key="created">Joined at: {profile.created}</li>
                <li key="roles">
                  Roles:
                  <ul>
                    {profile.roleList.map((role) => {
                      return <li key={role.roleName}>{role.roleName}</li>;
                    })}
                  </ul>
                </li>
              </Col>
            </Row>
            <Row>
              <Col md={0}></Col>
              <Col md={11}>
                <Button variant="danger" onClick={killUser}>
                  Delete User
                </Button>
              </Col>
              <Col md={1}></Col>
            </Row>
          </div>
        );
      })
      .catch((err) => {
        if (err.status) {
          err.fullError.then((e) => setError(e.message));
        }
        setError("An error occurred while processing your request.");
      });
  }, []);

  return (
    <>
      <h2>Profile</h2>
      {error ? (
        <>{error && <Alert variant="danger">{error}</Alert>}</>
      ) : (
        <>
          <Container>
            <Row>
              <Col md={6}>{getProfile}</Col>
              <Col md={6}>
                <Row>
                  <h2>Edit User</h2>
                </Row>
                <Row>
                  <Form>
                    <Form.Group>
                      <Form.Label className="" htmlFor="username">
                        Username
                      </Form.Label>
                      <Form.Control
                        onChange={onChange}
                        className=""
                        id="username"
                        placeholder="Enter a new username"
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label className="" htmlFor="firstname">
                        First Name
                      </Form.Label>
                      <Form.Control
                        onChange={onChange}
                        className=""
                        id="firstname"
                        placeholder="Enter a new first name"
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label className="" htmlFor="lastname">
                        Last Name
                      </Form.Label>
                      <Form.Control
                        onChange={onChange}
                        className=""
                        id="lastname"
                        placeholder="Enter a new last name"
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label className="" htmlFor="password">
                        Password
                      </Form.Label>
                      <Form.Control
                        onChange={onChange}
                        className=""
                        id="password"
                        placeholder="Enter a new password"
                      />
                    </Form.Group>
                    <Form.Group>
                      <Button
                        variant="warning"
                        type="submit"
                        className=""
                        onClick={editUser}
                      >
                        Edit User
                      </Button>
                    </Form.Group>
                  </Form>
                </Row>
              </Col>
            </Row>
          </Container>
        </>
      )}
    </>
  );
}
