import React, { useState, useEffect, useContext } from "react";

import AuthUserContext from "./context";

import { FirebaseContext } from "../Firebase";

const withAuthentication = (Component) => {
  const WithAuthentication = (props) => {
    const [authUser, setAuthUser] = useState(
      JSON.parse(localStorage.getItem("authUser"))
    );
    const firebase = useContext(FirebaseContext);

    useEffect(() => {
      var listener = firebase.onAuthUserListener(
        (authUser) => {
          localStorage.setItem("authUser", JSON.stringify(authUser));
          setAuthUser(authUser);
        },
        () => {
          localStorage.removeItem("authUser");
          setAuthUser(null);
        }
      );

      return () => {
        listener();
      };
    }, []);

    return (
      <AuthUserContext.Provider value={authUser}>
        <Component {...props} />
      </AuthUserContext.Provider>
    );
  };

  return WithAuthentication;
};

export default withAuthentication;
