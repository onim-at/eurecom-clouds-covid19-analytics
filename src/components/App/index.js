import React, { useState, useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { withAuthentication } from "../Session";
import API from "../../api";
import Navigation from "../Navigation";
import Home from "../Home";
import SignIn from "../SignIn";
import SignUp from "../SignUp";
import { CreateNews, UpdateNews } from "../CreateNews";
import PasswordForgetPage from "../PasswordForget";
import YourNews from "../YourNews";

import * as ROUTES from "../../constants/routes";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    API.getCountries()
      .then((countries) => {
        countries.sort((a, b) => a.Country.localeCompare(b.Country));
        setCountries(countries);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  return (
    <Router>
      <Navigation loading={loading} countries={countries} error={error} />
      <Switch>
        <Route path={ROUTES.HOME} component={Home} />
        <Route path={ROUTES.COUNTRY} component={Home} />
        <Route path={ROUTES.SIGN_IN} component={SignIn} />
        <Route path={ROUTES.SIGN_UP} component={SignUp} />
        <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
        <Route path={ROUTES.YOUR_NEWS} component={YourNews} />
        <Route
          path={ROUTES.CREATE_NEWS}
          render={(props) => (
            <CreateNews
              {...props}
              loading={loading}
              countries={countries}
              error={error}
            />
          )}
        />
        <Route path={ROUTES.MODIFY_NEWS} component={UpdateNews} />

        <Route render={() => <Redirect to={ROUTES.HOME} />} />
      </Switch>
    </Router>
  );
};

export default withAuthentication(App);
