import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import AuthUserContext from "./context";

import { FirebaseContext } from "../Firebase";

import * as ROUTERS from "../../constants/routes";

const withAuthorization = (condition) => (Component) => {
  const WithAuthorization = (props) => {
    const firebase = useContext(FirebaseContext);

    useEffect(() => {
      firebase.auth.onAuthStateChanged((authUser) => {
        if (!condition(authUser)) {
          props.history.push(ROUTES.SING_IN);
        }
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
        <Component {...props} />
      </AuthUserContext.Provider>
    );
  };

  return withRouter(WithAuthorization);
};

export default withAuthorization;
