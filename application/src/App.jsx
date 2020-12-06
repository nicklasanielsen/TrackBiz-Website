import React, { useState, useEffect, useCallback } from "react";
import { Route, Switch } from "react-router-dom";
import "./style/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";
import Header from "./components/Header";
import NoRoute from "./components/NoRoute";
import { Container } from "react-bootstrap";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Register from "./components/Register";
import facade from "./facade";
import TrackedShipments from "./components/TrackedShipments";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(facade.isLoggedIn());

  const tokenValidationCheck = useCallback(() => {
    if (isLoggedIn) {
      let currentStatus = facade.isLoggedIn();

      if (!currentStatus) {
        setLoggedIn(false);
        facade.logout();
      }
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const interval = setInterval(() => {
      tokenValidationCheck();
    }, 1000); /* Every Second */
    return () => clearInterval(interval);
  }, [tokenValidationCheck]);

  return (
    <div>
      <Header
        isLoggedIn={isLoggedIn}
        setLoggedIn={setLoggedIn}
        isAdmin={facade.isAdmin}
      />

      <Container>
        <Switch>
          <Route exact path="/TrackBiz/">
            <Home />
          </Route>
          <PrivateRoute
            path="/TrackBiz/profile"
            isLoggedIn={isLoggedIn}
            component={Profile}
          />
          <PrivateRoute
            path="/TrackBiz/member/Shipments"
            isLoggedIn={isLoggedIn}
            component={TrackedShipments}
          ></PrivateRoute>
          <Route path="/TrackBiz/member/login/">
            <Login setLoggedIn={setLoggedIn} />
          </Route>
          <Route path="/TrackBiz/member/register/">
            <Register setLoggedIn={setLoggedIn} />
          </Route>
          <Route>
            <NoRoute />
          </Route>
        </Switch>
      </Container>
    </div>
  );
}

export default App;
