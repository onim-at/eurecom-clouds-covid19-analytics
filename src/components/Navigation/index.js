import React, { useContext } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

import SignOutButton from "../SignOut";
import * as ROUTES from "../../constants/routes";
import * as ROLES from "../../constants/roles";
import * as Styles from "../../styles/styles";
import { AuthUserContext } from "../Session";

const Navigation = (props) => {
  const authUser = useContext(AuthUserContext);
  const classes = Styles.useNavigationStyles();

  return authUser ? (
    <NavigationAuth classes={classes} authUser={authUser} />
  ) : (
    <NavigationNonAuth classes={classes} />
  );
};

const NavigationAuth = ({ classes, authUser }) => (
  <AppBar color="transparent" position="static">
    <Toolbar>
      <Typography variant="h5" className={classes.title}>
        COVID-19
      </Typography>
      <Typography variant="h6" className={classes.title}>
        Welcome {authUser.username}
      </Typography>
      <Button color="inherit" href={ROUTES.HOME}>
        Home
      </Button>
      <Button color="inherit" href={ROUTES.COUNTRY}>
        Country
      </Button>
      {!!authUser.roles[ROLES.WRITER] && (
        <Button color="inherit" href={ROUTES.ADD_NEWS}>
          ADD NEWS
        </Button>
      )}
      <SignOutButton color="inherit" />
    </Toolbar>
  </AppBar>
);

const NavigationNonAuth = ({ classes }) => (
  <AppBar color="transparent" position="static">
    <Toolbar>
      <Typography variant="h5" className={classes.title}>
        COVID-19
      </Typography>
      <Button color="inherit" href={ROUTES.HOME}>
        Home
      </Button>
      <Button color="inherit" href={ROUTES.COUNTRY}>
        Country
      </Button>
      <Button color="inherit" href={ROUTES.SIGN_IN}>
        Sign in
      </Button>
      <Button color="inherit" href={ROUTES.SIGN_UP}>
        Sign up
      </Button>
    </Toolbar>
  </AppBar>
);

export default Navigation;
