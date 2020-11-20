import {fade, makeStyles } from "@material-ui/core/styles";
import * as COLORS from "../constants/colors";

export const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  countryTitle: {
    display: 'flex',
    justifyContent: 'center',
    padding: "8px 0px",
    backgroundColor: COLORS.COUNTRY,
  },
}));

export const useNavigationStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export const useTableStyles = makeStyles((theme) => ({
  root: {
    "& .country--cell": {
      backgroundColor: COLORS.COUNTRY,
      border: "2px solid white",
    },
    "& .confirmed--cell": {
      backgroundColor: COLORS.CONFIRMED,
      border: "2px solid white",
    },

    "& .recovered--cell": {
      backgroundColor: COLORS.RECOVERED,
      border: "2px solid white",
    },
    "& .deaths--cell": {
      backgroundColor: COLORS.DEATHS,
      border: "2px solid white",
    },
  },
}));

export const useNewNavigationStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  title: {
    marginRight: theme.spacing(2),
    textDecoration: 'none',
    "&:hover": {
      color: 'black',
    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.primary.light, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.primary.light, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));