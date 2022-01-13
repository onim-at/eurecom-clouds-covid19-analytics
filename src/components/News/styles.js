import { makeStyles } from "@material-ui/core/styles";

export const useGridSlideStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContentContent: "space-around",
    backgroundColor: theme.palette.background.paper,
  },
  imageList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
  },
  imageListTile: {
    position: "relative",
    float: "left",
    minWidth: 250,
    height: "100% !important",
  },
}));

export const useCardStyles = makeStyles({
  root: {
    display: "block",

    transitionDuration: "0.3s",
    height: 350,
    width: 250,
  },
  header: {
    height: 130,
    width: 250,
  },
  media: {
    height: 170,
    width: 250,
  },
});
