import React, { useContext } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import AccountCircle from "@material-ui/icons/AccountCircle";
import SignOutButton from "../SignOut";
import * as ROUTES from "../../constants/routes";
import * as ROLES from "../../constants/roles";
import * as Styles from "../../styles/styles";
import Link from "@material-ui/core/Link";
import { AuthUserContext } from "../Session";
import SearchIcon from "@material-ui/icons/Search";

import PrimarySearchAppBar from "./navigation";

const Navigation = (props) => {
  const authUser = useContext(AuthUserContext);
  const classes = Styles.useNewNavigationStyles();

  return (
    <div className={classes.grow}>
      <AppBar color="transparent" position="static">
        <Toolbar>
          <Link color="inherit" style={{ textDecoration: 'none' }} href={ROUTES.HOME} className={classes.title}>
            <Typography variant="h5" >COVID-19 Analytics</Typography>
          </Link>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <div className={classes.grow} />
          {authUser ? (
            <NavigationAuth classes={classes} authUser={authUser} />
          ) : (
            <NavigationNonAuth classes={classes} />
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

const NavigationAuth = ({ classes, authUser }) => (
  <>
    <Typography variant="h6">Welcome {authUser.username}</Typography>
    <IconButton
      aria-label="account of current user"
      aria-controls="menu-appbar"
      aria-haspopup="true"
      color="inherit"
    >
      <AccountCircle />
    </IconButton>
    {!!authUser.roles[ROLES.WRITER] && (
      <Button color="inherit" href={ROUTES.ADD_NEWS}>
        Your news
      </Button>
    )}
    <SignOutButton color="inherit" />
  </>
);

const NavigationNonAuth = ({ classes }) => (
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

export { PrimarySearchAppBar };
