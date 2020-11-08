import React, { useState, useEffect, useContext } from "react";

import AuthUserContext from "./context";

import { FirebaseContext } from "../Firebase";
import AuthUserContext from "./context";

const withAuthentication = (Component) => {
  const WithAuthentication = (props) => {
    const [authUser, setAuthUser] = useState(null);
    const firebase = useContext(FirebaseContext);
    const authUser = useContext(AuthUserContext);

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

    return condition(authUser) ? <Component {...this.props} /> : null;
  };

  return WithAuthentication;
};

export default withAuthentication;
