import React, { useContext } from "react";
import { withRouter, Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
//import Link from "@material-ui/core/Link";
import MoreIcon from "@material-ui/icons/MoreVert";
import Box from "@material-ui/core/Box";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import SignOutButton from "../SignOut";
import Button from "@material-ui/core/Button";

import * as ROLES from "../../constants/roles";
import * as Styles from "./styles";
import { AuthUserContext } from "../Session";

import * as ROUTES from "../../constants/routes";

function NavigationBase(props) {
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const authUser = useContext(AuthUserContext);
  const classes = Styles.useStyles();

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleSubmit = (value) => {
    if (value) {
      props.history.push(ROUTES.COUNTRY_BASE + "/" + value.Slug);
    }
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileAuthMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {authUser && !!authUser.roles[ROLES.WRITER] && (
        <MenuItem>
          <Link color="inherit" to={ROUTES.YOUR_NEWS}>
            <Button color="inherit">Your News</Button>
          </Link>
        </MenuItem>
      )}
      {authUser && !!authUser.roles[ROLES.WRITER] && (
        <MenuItem>
          <Link color="inherit" to={ROUTES.CREATE_NEWS}>
            <Button color="inherit">Create News</Button>
          </Link>
        </MenuItem>
      )}
      <MenuItem>
        <SignOutButton color="inherit" />
      </MenuItem>
    </Menu>
  );

  const mobileNonAuthMenuId = "primary-search-account-menu-non-auth-mobile";
  const renderMobileNonAuthMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileNonAuthMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <Link color="inherit" to={ROUTES.SIGN_IN}>
          <Button color="inherit">Sign in</Button>
        </Link>
      </MenuItem>
      <MenuItem>
        <Link color="inherit" to={ROUTES.SIGN_UP}>
          <Button color="inherit">Sign up</Button>
        </Link>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <Link
            color="inherit"
            style={{ textDecoration: "none" }}
            href={ROUTES.HOME}
            className={classes.title}
          >
            <Box display={{ xs: "none", sm: "block" }}>
              <Typography variant="h5">COVID-19 Analytics</Typography>
            </Box>
          </Link>
          <div className={classes.search}>
            <CountrySelect
              loading={props.loading}
              countries={props.countries}
              error={props.error}
              handleSubmit={handleSubmit}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {authUser ? (
              <NavigationAuth classes={classes} authUser={authUser} />
            ) : (
              <NavigationNonAuth classes={classes} />
            )}
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {authUser ? renderMobileAuthMenu : renderMobileNonAuthMenu}
    </div>
  );
}

const NavigationAuth = ({ classes, authUser }) => (
  <>
    <Typography variant="h6">Welcome {authUser.username}</Typography>

    {!!authUser.roles[ROLES.WRITER] && (
      <>
        <Link color="inherit" to={ROUTES.YOUR_NEWS}>
          <Button color="inherit">Your News</Button>
        </Link>
        <Link color="inherit" to={ROUTES.CREATE_NEWS}>
          <Button color="inherit">Create News</Button>
        </Link>
      </>
    )}
    <SignOutButton color="inherit" />
  </>
);

const NavigationNonAuth = ({ classes }) => (
  <>
    <Link color="inherit" to={ROUTES.SIGN_IN}>
      <Button color="inherit">Sign in</Button>
    </Link>
    <Link color="inherit" to={ROUTES.SIGN_UP}>
      <Button color="inherit">Sign up</Button>
    </Link>
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

export { CountrySelect };

export default Navigation;
