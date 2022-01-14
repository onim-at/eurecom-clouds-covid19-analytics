import { makeStyles } from "@material-ui/core/styles";
import * as COLORS from "../../constants/colors";

export const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  paper: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  countryTitle: {
    display: "flex",
    justifyContent: "center",
    padding: "8px 0px",
    backgroundColor: COLORS.COUNTRY,
  },
}));
