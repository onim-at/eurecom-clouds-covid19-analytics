import React, { useContext, useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import Container from "@material-ui/core/Container";
import { withRouter } from "react-router-dom";

import { FirebaseContext } from "../../firebase";

import * as ROUTES from "../../constants/routes";
import * as styles from "./styles";
import { SignInLink, SignInGoogle } from "../SignIn";

const INITIAL_STATE = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  error: null,
};

const SignUp = (props) => {
  const [email, setEmail] = useState(INITIAL_STATE.email);
  const [password, setPassword] = useState(INITIAL_STATE.password);
  const [confirmPassword, setConfirmPassword] = useState(
    INITIAL_STATE.confirmPassword
  );
  const [username, setUsername] = useState(INITIAL_STATE.username);
  const [error, setError] = useState(INITIAL_STATE.error);

  const firebase = useContext(FirebaseContext);

  const classes = styles.useStyles();

  const ERROR_CODE_ACCOUNT_EXISTS = "auth/email-already-in-use";

  const ERROR_MSG_ACCOUNT_EXISTS = `
    An account with this E-Mail address already exists.
    Try to login with this account instead. If you think the
    account is already used from one of the social logins, try
    to sign-in with one of them. Afterward, associate your accounts
    on your personal account page.
  `;

  const isInvalid =
    password !== confirmPassword ||
    password === "" ||
    email === "" ||
    username === "";

  const createUserWithEmailAndPasswordHandler = (event) => {
    event.preventDefault();

    firebase
      .doCreateUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return firebase.user(authUser.user.uid).set({
          username,
          email,
        });
      })
      .then((authUser) => {
        setEmail(INITIAL_STATE.email);
        setUsername(INITIAL_STATE.username);
        setPassword(INITIAL_STATE.password);
        setConfirmPassword(INITIAL_STATE.confirmPassword);
        setError(INITIAL_STATE.error);

        props.history.push(ROUTES.HOME);
      })
      .catch((error) => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }
        setError(error);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="username"
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                autoFocus
                autoComplete="username"
                value={username}
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="confirm-password"
                value={confirmPassword}
                onChange={(event) => {
                  setConfirmPassword(event.target.value);
                }}
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={isInvalid}
            onClick={(event) => {
              createUserWithEmailAndPasswordHandler(event);
            }}
          >
            Sign Up
          </Button>
          <Box textAlign="center">
            <Typography variant="h6">Or</Typography>
          </Box>
          <SignInGoogle setError={setError} />
          {error != null && <Alert severity="error">{error.message}</Alert>}
          <Grid container justifyContent="flex-end">
            <Grid item>
              <SignInLink />
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

const SignUpLink = () => (
  <Link href={ROUTES.SIGN_UP} variant="body2">
    "Don't have an account? Sign Up"
  </Link>
);

export default withRouter(SignUp);

export { SignUpLink };
