import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { isRider } from "../../services/AuthService";

import "./landing.css";

function Landing({ isLoggedIn }) {
  return (
    <div className="landing-container">
      <h1 className="landing logo">Taxi</h1>
      {isLoggedIn ? (
        <LinkContainer to={isRider() ? "/rider" : "/driver"}>
          <Button data-cy="dashboard">Dashboard</Button>
        </LinkContainer>
      ) : (
        <ButtonGroup>
          <LinkContainer to="/sign-up">
            <Button>Sign up</Button>
          </LinkContainer>
          <LinkContainer to="/log-in">
            <Button>Log in</Button>
          </LinkContainer>
        </ButtonGroup>
      )}
    </div>
  );
}

export default Landing;
