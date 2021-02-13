import {fade, makeStyles } from "@material-ui/core/styles";

export const useGridSlideStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      flexWrap: 'nowrap',
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: 'translateZ(0)',
    },
    gridListTile: {
      position: 'relative',
        float: 'left',
        minWidth: 250,
        height: '100% !important'
    }
  }));
  
  export const useCardStyles = makeStyles({
    root: {
      display: 'block',
    
      transitionDuration: '0.3s',
      height: 350,
      width: 250,
    },
    header: {
      height: 130,
      width: 250,
    },
    media: {
      height: 170,
      width: 250
    },
  });