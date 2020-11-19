import React, { useContext, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
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

import { FirebaseContext } from "../Firebase";

import { SignUpLink } from "../SignUp";
import * as ROUTES from "../../constants/routes";
import * as styles from "../../styles/styles";
import { PasswordForgetLink } from "../PasswordForget";

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null,
};

const SignInPage = () => <SignInForm />;

const SignInFormBase = (props) => {
  const [email, setEmail] = useState(INITIAL_STATE.email);
  const [password, setPassword] = useState(INITIAL_STATE.password);
  const [error, setError] = useState(INITIAL_STATE.error);

  const firebase = useContext(FirebaseContext);

  const classes = styles.useStyles();

  const isInvalid = password === "" || email === "";

  const signInWithEmailAndPasswordHandler = (event) => {
    event.preventDefault();

    firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        setEmail(INITIAL_STATE.email);
        setPassword(INITIAL_STATE.password);
        setError(INITIAL_STATE.error);

        props.history.push(ROUTES.HOME);
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
          Sign in
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
          <TextField
            variant="outlined"
            margin="normal"
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={isInvalid}
            onClick={(event) => {
              signInWithEmailAndPasswordHandler(event);
            }}
          >
            Sign In
          </Button>
          <Box textAlign="center">
            <Typography variant="h6">Or</Typography>
          </Box>
          <SignInGoogle setError={setError} />
          {error != null && <Alert severity="error">{error.message}</Alert>}
        </form>
        <Grid container>
          <Grid item xs>
            <PasswordForgetLink />
          </Grid>
          <Grid item>
            <SignUpLink />
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

const SignInGoogleBase = (props) => {
  const firebase = useContext(FirebaseContext);

  const classes = styles.useStyles();

  const signInWithGoogleHandler = (event) => {
    event.preventDefault();

    firebase
      .doSignInWithGoogle()
      .then((socialAuthUser) => {
        console.log(socialAuthUser)
        var user = firebase.user(socialAuthUser.user.uid)
        user.get().then((doc) => {
          
        })
        return firebase.user(socialAuthUser.user.uid).set({
          username: socialAuthUser.user.displayName,
          email: socialAuthUser.user.email,
          roles: {WRITER: 'WRITER'}
        });
      })
      .then(() => {
        props.setError(null);
        props.history.push(ROUTES.HOME);
      })
      .catch((error) => {
        props.setError(error);
      });
  };

  return (
    <Button
      fullWidth
      variant="contained"
      color="secondary"
      className={classes.submit}
      onClick={(event) => {
        signInWithGoogleHandler(event);
      }}
    >
      Sign In with Google
    </Button>
  );
};

const SignInLink = (props) => (
  <Link href={ROUTES.SIGN_IN} variant="body2">
    Already have an account? Sign in
  </Link>
);

export default SignInPage;

const SignInForm = withRouter(SignInFormBase);
const SignInGoogle = withRouter(SignInGoogleBase);

export { SignInForm, SignInLink, SignInGoogle };
