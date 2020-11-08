import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";

import AuthUserContext from "./context";
import { FirebaseContext } from "../Firebase";

import * as ROUTES from "../../constants/routes";

const withAuthorization = (condition) => (Component) => {
  const WithAuthorization = (props) => {
    const firebase = useContext(FirebaseContext);
    const authUser = useContext(AuthUserContext);

    useEffect(() => {
      var listener = firebase.auth.onAuthStateChanged((authUser) => {
        if (!condition(authUser)) {
          props.history.push(ROUTES.SIGN_IN);
        }
      });

      return () => {
        listener();
      };
    });

    return condition(authUser) ? <Component {...props} /> : null;
  };

  return withRouter(WithAuthorization);
};

export default withAuthorization;
