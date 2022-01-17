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
import { CreateNews, UpdateNews } from "../CreateNews";
import { FirebaseContext } from "../../firebase";

import PasswordForgetPage from "../PasswordForget";
import YourNews from "../YourNews";
import { combineSummaryVaccines } from "../../transform";

import * as ROUTES from "../../constants/routes";

const App = () => {
  const [summary, setSummary] = useState({});
  const [summaryLoading, setSummaryLoading] = useState(false);
  const firebase = useContext(FirebaseContext);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        let summary = await firebase.getSummary();
        let vaccines = await firebase.getVaccines();
        let combine = combineSummaryVaccines(summary, vaccines);
        setSummary(combine);
        setSummaryLoading(false);
      } catch (error) {
        setError(error);
      }
    }

    setSummaryLoading(true);
    setError(null);

    fetchData();

    return () => {
      setSummaryLoading(true);
    };
  }, [firebase]);

  let countries = Object.keys(summary);
  return (
    <Router>
      <Navigation
        loading={summaryLoading}
        countries={countries}
        error={error}
      />
      <Switch>
        <Route
          path={ROUTES.HOME}
          render={() => (
            <Home summary={summary} summaryLoading={summaryLoading} />
          )}
        />
        <Route path={ROUTES.SIGN_IN} component={SignIn} />
        <Route path={ROUTES.SIGN_UP} component={SignUp} />
        <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
        <Route path={ROUTES.YOUR_NEWS} component={YourNews} />
        <Route
          path={ROUTES.CREATE_NEWS}
          render={(props) => (
            <CreateNews
              {...props}
              loading={summaryLoading}
              countries={countries}
              error={error}
            />
          )}
        />
        <Route path={ROUTES.MODIFY_NEWS} component={UpdateNews} />

        <Route render={() => <Redirect to={ROUTES.HOME_REDIRECT} />} />
      </Switch>
    </Router>
  );
};

export default withAuthentication(App);
