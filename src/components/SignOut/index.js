import React, { useContext } from "react";
import Button from "@material-ui/core/Button";

import { FirebaseContext } from "../../firebase";

const SignOutButton = (props) => {
  const firebase = useContext(FirebaseContext);

  return (
    <Button color={props.color} onClick={firebase.doSignOut}>
      Sign Out
    </Button>
  );
};

export default SignOutButton;
