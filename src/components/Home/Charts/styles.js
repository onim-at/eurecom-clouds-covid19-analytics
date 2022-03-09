import { makeStyles } from "@material-ui/core/styles";
import * as COLORS from "../../../constants/colors";

export const useStyles = makeStyles((theme) => ({
  root: {
    "& .country--cell": {
      backgroundColor: COLORS.COUNTRY,
      border: "2px solid white",
    },
    "& .confirmed--cell": {
      backgroundColor: COLORS.CONFIRMED,
      border: "2px solid white",
    },
    "& .deaths--cell": {
      backgroundColor: COLORS.DEATHS,
      border: "2px solid white",
    },
    "& .vaccines--cell": {
      backgroundColor: COLORS.VACCINATED,
      border: "2px solid white",
    },
  },
}));
