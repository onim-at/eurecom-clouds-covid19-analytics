import React, { useState, useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { withAuthentication } from "../Session";

import Navigation from "../Navigation";
import Home from "../Home";
import SignIn from "../SignIn";
import SignUp from "../SignUp";
import CreateNews from "../CreateNews";
import PasswordForgetPage from "../PasswordForget";
import YourNews from "../YourNews";

import * as ROUTES from "../../constants/routes";

const App = () => {
  return (
    <Router>
      <Navigation />
      <Switch>
        <Route path={ROUTES.HOME} component={Home} />
        <Route path={ROUTES.COUNTRY} component={Home} />
        <Route path={ROUTES.SIGN_IN} component={SignIn} />
        <Route path={ROUTES.SIGN_UP} component={SignUp} />
        <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
        <Route path={ROUTES.YOUR_NEWS} component={YourNews} />
        <Route path={ROUTES.CREATE_NEWS} component={CreateNews} />
        <Route path={ROUTES.MODIFY_NEWS} component={CreateNews} />

        <Route render={() => <Redirect to={ROUTES.HOME} />} />
      </Switch>
    </Router>
  );
};

export default withAuthentication(App);
