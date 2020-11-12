import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import Navigation from "../Navigation";
import Home from "../Home";
import SignIn from "../SignIn";
import SignUp from "../SignUp";

import { withAuthentication } from "../Session";

import * as ROUTES from "../../constants/routes";
import PasswordForgetPage from "../PasswordForget";
import AddNews from "../AddNews";

const App = () => {
  return (
    <Router>
      <Navigation />
      <Route path={ROUTES.HOME} component={Home} />
      <Route path={ROUTES.COUNTRY} component={Home} />
      <Route path={ROUTES.SIGN_IN} component={SignIn} />
      <Route path={ROUTES.SIGN_UP} component={SignUp} />
      <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
      <Route path={ROUTES.ADD_NEWS} component={AddNews} />
    </Router>
  );
};

export default withAuthentication(App);
