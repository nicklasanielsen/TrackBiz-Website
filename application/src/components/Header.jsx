import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { NavLink, Redirect } from "react-router-dom";
import Logo from "../Icons/Logo.js";
import facade from "../facade";

export default function Header({ isLoggedIn, setLoggedIn, isAdmin }) {
  const performLogout = () => {
    setLoggedIn(false);
    facade.logout();

    return <Redirect to="/Member/login/" />;
  };

  return (
    <ul className="header">
      <Container>
        <Row>
          <Col md={7} className="headerLogo">
            <NavLink exact activeClassName="active" to="/TrackBiz/">
              <Logo height="100px" />
            </NavLink>
          </Col>
          <Col md={5} className="headerButtons">
            {isLoggedIn ? (
              <>
                <li>
                  <NavLink
                    className="myProfile"
                    activeClassName="active"
                    to="/TrackBiz/profile/"
                  >
                    My Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="myShipments"
                    activeClassName=""
                    to="/TrackBiz/member/Shipments/"
                  >
                    My Shipments
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="logout"
                    activeClassName=""
                    to="/TrackBiz/member/login/"
                    onClick={performLogout}
                  >
                    Logout
                  </NavLink>
                </li>
                {isAdmin && (
                  <li>
                    <NavLink
                      className="proposals"
                      activeClassName="active"
                      to="/TrackBiz/admin/feedback/"
                    >
                      Feedback
                    </NavLink>
                  </li>
                )}
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
            <li>
              <NavLink
                className="feedback"
                activeClassName="active"
                to="/TrackBiz/feedback/"
              >
                Recommend Courier
              </NavLink>
            </li>
          </Col>
        </Row>
      </Container>
    </ul>
  );
}
