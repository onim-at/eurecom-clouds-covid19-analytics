import {fade, makeStyles } from "@material-ui/core/styles";
import * as COLORS from "../../constants/colors";

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
  grow: {
    flexGrow: 1
  }
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