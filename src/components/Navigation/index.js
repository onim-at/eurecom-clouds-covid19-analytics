import React, { useContext, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Link from "@material-ui/core/Link";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";

import { AuthUserContext } from "../Session";
import SignOutButton from "../SignOut";
import * as ROUTES from "../../constants/routes";
import * as ROLES from "../../constants/roles";
import * as Styles from "../../styles/styles";

const NavigationBase = (props) => {
  const authUser = useContext(AuthUserContext);
  const classes = Styles.useNavigationStyles();

  const handleSubmit = (value) => {
    if (value) {
      props.history.push(ROUTES.COUNTRY_BASE + "/" + value.Slug);
    }
  };

  return (
    <div className={classes.grow}>
      <AppBar color="transparent" position="static">
        <Toolbar>
          <Link
            color="inherit"
            style={{ textDecoration: "none" }}
            href={ROUTES.HOME}
            className={classes.title}
          >
            <Typography variant="h5">COVID-19 Analytics</Typography>
          </Link>

          <CountrySelect
            loading={props.loading}
            countries={props.countries}
            error={props.error}
            handleSubmit={handleSubmit}
          />

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
      <>
        <Button color="inherit" href={ROUTES.YOUR_NEWS}>
          Your News
        </Button>
        <Button color="inherit" href={ROUTES.CREATE_NEWS}>
          Create News
        </Button>
      </>
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

const CountrySelect = (props) => {
  return (
    <Autocomplete
      id="country-select"
      style={{ width: 300 }}
      options={props.countries}
      size="small"
      autoHighlight
      loading={props.loading}
      getOptionLabel={(option) => option.Country}
      onChange={(event, value) => props.handleSubmit(value)}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Choose a country"
          variant="outlined"
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password", // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
};

const Navigation = withRouter(NavigationBase);

export default Navigation;

export { CountrySelect };
