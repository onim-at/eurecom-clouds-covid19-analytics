import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navigation from "../Navigation";
import Home from "../Home";
import Country from "../Country";
import SignIn from "../SignIn";
import SignUp from "../SignUp";

import { FirebaseContext } from "../Firebase";
import { AuthUserContext } from "../Session";

import * as ROUTES from "../../constants/routes";

const App = () => {
  const [authUser, setAuthUser] = useState(null);
  const firebase = useContext(FirebaseContext);

  useEffect(() => {
    firebase.auth.onAuthStateChanged((authUser) => {
      authUser ? setAuthUser(authUser) : setAuthUser(null);
    });

    // remove listener if component unmounts?
    // var listener = firebase.auth.onAuthStateChanged((authUser) => {
    //   authUser ? setAuthUser(authUser) : setAuthUser(null);
    // });
    // return (listener) => {
    //   listener();
    // }
  });

  return (
    <AuthUserContext.Provider value={authUser}>
      <Router>
        <Navigation authUser={authUser} />

        <hr />

        <Route exact path={ROUTES.HOME} component={Home} />
        <Route path={ROUTES.COUNTRY} component={Country} />
        <Route path={ROUTES.SIGN_IN} component={SignIn} />
        <Route path={ROUTES.SIGN_UP} component={SignUp} />
      </Router>
    </AuthUserContext.Provider>
  );
};

export default App;
