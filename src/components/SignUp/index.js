import React, { useContext, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert"
import Container from "@material-ui/core/Container";
import { withRouter } from "react-router-dom";

import { FirebaseContext } from "../Firebase";

import * as ROUTES from "../../constants/routes";
import * as styles from "../../styles/styles";

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

  const isInvalid =
    password !== confirmPassword ||
    password === "" ||
    email === "" ||
    username === "";

  const onSubmit = (event) => {
    event.preventDefault();

    console.log("FIREBASE");
    firebase
      .doCreateUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        setEmail(INITIAL_STATE.email);
        setUsername(INITIAL_STATE.username);
        setPassword(INITIAL_STATE.password);
        setConfirmPassword(INITIAL_STATE.confirmPassword);
        setError(INITIAL_STATE.error);
        console.log("FIRE");

        //props.history.push(ROUTES.HOME);
      })
      .catch((error) => {
        setError({ error });
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>AAAA</Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={onSubmit}>
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
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={isInvalid}
          >
            Sign Up
          </Button>
          <Box textAlign="center">
            <Typography variant="h5">Or</Typography>
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
            Sign Up with Google
          </Button>
          {error != null && (
            <Alert severity="error">
              {error.error.message}
            </Alert>
          )}
          <Grid container justify="flex-end">
            <Grid item>
              <Link href={ROUTES.SIGN_IN} variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default withRouter(SignUp);
