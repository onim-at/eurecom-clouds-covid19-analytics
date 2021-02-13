import React, { useContext } from "react";
import { withRouter } from "react-router-dom";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import Link from "@material-ui/core/Link";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
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
            <Button color="inherit" href={ROUTES.YOUR_NEWS}>
              Your News
            </Button>
          </MenuItem>
          )}
          {authUser && !!authUser.roles[ROLES.WRITER] && (
          <MenuItem>
            <Button color="inherit" href={ROUTES.CREATE_NEWS}>
              Create News
            </Button>
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
        <Button color="inherit" href={ROUTES.SIGN_IN}>
          Sign in
        </Button>
      </MenuItem>
      <MenuItem>
        <Button color="inherit" href={ROUTES.SIGN_UP}>
          Sign up
        </Button>
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
      {authUser ? 
      renderMobileAuthMenu : 
      renderMobileNonAuthMenu}
    </div>
  );
}

const NavigationAuth = ({ classes, authUser }) => (
  <>
    <Typography variant="h6">Welcome {authUser.username}</Typography>

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

export {CountrySelect}

export default Navigation