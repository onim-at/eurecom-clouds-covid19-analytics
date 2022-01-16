import React, { useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";

import AuthUserContext from "./context";
import { FirebaseContext } from "../../firebase";

import * as ROUTES from "../../constants/routes";

const withAuthorization = (condition) => (Component) => {
  const WithAuthorization = (props) => {
    const firebase = useContext(FirebaseContext);
    const authUser = useContext(AuthUserContext);

    useEffect(() => {
      var listener = firebase.onAuthUserListener(
        (authUser) => {
          if (!condition(authUser)) {
            props.history.push(ROUTES.HOME);
          }
        },
        () => props.history.push(ROUTES.HOME)
      );

      return () => {
        listener();
      };
    });

    return condition(authUser) ? <Component {...props} /> : null;
  };

  return withRouter(WithAuthorization);
};

export default withAuthorization;
