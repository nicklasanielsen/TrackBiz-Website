import React from "react";
import { Col, Container, Nav, Row } from "react-bootstrap";
import { Redirect, NavLink } from "react-router-dom";
import Logo from "../Icons/Logo.js";

export default function Header() {
  return (
    <ul className="header">
      <Container>
        <Row>
          <Col md={8} className="headerLogo">
            <NavLink exact activeClassName="active" to="/TrackBiz/">
              <Logo height="100px" />
            </NavLink>
          </Col>
          <Col md={4} className="headerButtons"></Col>
        </Row>
      </Container>
    </ul>
  );
}
