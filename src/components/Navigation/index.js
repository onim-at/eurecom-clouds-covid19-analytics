import React, { useContext } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

import SignOutButton from "../SignOut";
import * as ROUTES from "../../constants/routes";
import * as Styles from "../../styles/styles";
import { AuthUserContext } from "../Session";

const Navigation = (props) => {
  const authUserContext = useContext(AuthUserContext);
  const classes = Styles.useNavigationStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        ></IconButton>
        <Typography variant="h6" className={classes.title}>
          COVID-19
        </Typography>
        <Button color="inherit" href={ROUTES.HOME}>
          Home
        </Button>
        <Button color="inherit" href={ROUTES.COUNTRY}>
          Country
        </Button>
        {authUserContext ? <NavigationAuth /> : <NavigationNonAuth />}
      </Toolbar>
    </AppBar>
  );
};

const NavigationAuth = () => <SignOutButton color="inherit" />;

const NavigationNonAuth = () => (
  <>
    <Button color="inherit" href={ROUTES.SIGN_IN}>
      Sign in
    </Button>
    <Button color="inherit" href={ROUTES.SIGN_UP}>
      Sign up
    </Button>
  </>
);

export default Navigation;
