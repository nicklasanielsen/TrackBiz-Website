import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { NavLink, Redirect } from "react-router-dom";
import Logo from "../Icons/Logo.js";
import facade from "../facade";

export default function Header({ isLoggedIn, setLoggedIn, isAdmin }) {
  const performLogout = () => {
    setLoggedIn(false);
    facade.logout();

    return <Redirect to="/Member/login" />;
  };

  return (
    <ul className="header">
      <Container>
        <Row>
          <Col md={8} className="headerLogo">
            <NavLink exact activeClassName="active" to="/TrackBiz/">
              <Logo height="100px" />
            </NavLink>
          </Col>
          <Col md={4} className="headerButtons">
            {isLoggedIn ? (
              <>
                <li>
                  <NavLink activeClassName="active" to="/TrackBiz/profile">
                    My Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    activeClassName=""
                    to="/TrackBiz/member/login"
                    onClick={performLogout}
                  >
                    Logout
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    className="login"
                    activeClassName="active"
                    to="/TrackBiz/member/login/"
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="register"
                    activeClassName="active"
                    to="/TrackBiz/member/register/"
                  >
                    Register at TrackBiz!
                  </NavLink>
                </li>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </ul>
  );
}
