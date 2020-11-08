import React, { useState, useEffect, useContext } from "react";

import AuthUserContext from "./context";

import { FirebaseContext } from "../Firebase";

const withAuthentication = (Component) => {
  const WithAuthentication = (props) => {
    const [authUser, setAuthUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const firebase = useContext(FirebaseContext);

    useEffect(() => {
      setLoading(true);

      var listener = firebase.auth.onAuthStateChanged((authUser) => {
        authUser ? setAuthUser(authUser) : setAuthUser(null);
        setLoading(false);
      });

      return () => {
        listener();
      };
    });

    return (
      <AuthUserContext.Provider value={authUser}>
        {!loading && <Component {...props} />}
      </AuthUserContext.Provider>
    );
  };

  return WithAuthentication;
};

export default withAuthentication;
