import React, { useContext, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import Container from "@material-ui/core/Container";

import { FirebaseContext } from "../Firebase";
import * as ROUTES from "../../constants/routes";
import * as Styles from "./styles";

const PasswordForgetPage = () => (
  <div>
    <PasswordForgetForm />
  </div>
);

const INITIAL_STATE = {
  email: "",
  error: null,
};

const PasswordForgetForm = () => {
  const [email, setEmail] = useState(INITIAL_STATE.email);
  const [error, setError] = useState(INITIAL_STATE.error);
  const firebase = useContext(FirebaseContext);
  const classes = Styles.useStyles();
  const isInvalid = email === "";

  const resetPasswordHandler = (event) => {
    event.preventDefault();

    firebase
      .doPasswordReset(email)
      .then(() => {
        setEmail(INITIAL_STATE.email);
        setError(INITIAL_STATE.error);
      })
      .catch((error) => {
        setError(error);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>AAAA</Avatar>
        <Typography component="h1" variant="h4">
          Reset Password
        </Typography>

        <form className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={isInvalid}
            onClick={(event) => {
              resetPasswordHandler(event);
            }}
          >
            Reset My Password
          </Button>

          {error != null && <Alert severity="error">{error.message}</Alert>}
        </form>
      </div>
    </Container>
  );
};

const PasswordForgetLink = () => (
  <Link href={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
);

export default PasswordForgetPage;

export { PasswordForgetForm, PasswordForgetLink };
