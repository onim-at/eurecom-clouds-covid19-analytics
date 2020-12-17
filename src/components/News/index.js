import React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";

import * as styles from "../../styles/styles";


class News {
  constructor(location, title, image, content, user, date) {
    this.location = location;
    this.title = title;
    this.image = image;
    this.content = content;
    this.user = user;
    this.date = date;
  }

  static from(data) {
    return new News(data.location, data.title, data.image, data.content, data.user, data.date);
}
}

const ShowNews = () => {
  return <></>;
};

const SingleLineGridList = ({ data }) => {
  const classes = styles.useGridSlideStyles();
  const tileData = [
    <NewsCard></NewsCard>,
    <NewsCard></NewsCard>,
    <NewsCard></NewsCard>,
    <NewsCard></NewsCard>,
    <NewsCard></NewsCard>,
    <NewsCard></NewsCard>,
  ];
  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={2.5}>
        {data.map((tile, index) => (
          <GridListTile key={index}>
            {tile}
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};


/*
function TitlebarGridList() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
          <ListSubheader component="div">December</ListSubheader>
        </GridListTile>
        {tileData.map((tile) => (
          <GridListTile key={tile.img}>
            <img src={tile.img} alt={tile.title} />
            <GridListTileBar
              title={tile.title}
              subtitle={<span>by: {tile.author}</span>}
              actionIcon={
                <IconButton aria-label={`info about ${tile.title}`} className={classes.icon}>
                  <InfoIcon />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
*/

const NewsCard = ({news}) => {
  const classes = styles.useCardStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardHeader
          avatar={<Avatar aria-label="recipe">R</Avatar>}
          title={news.user}
          subheader={news.date}
        />
        <CardMedia className={classes.media} image={news.image} title={news.title} />
        <CardContent className={classes.content}>
          <Typography gutterBottom variant="h5" component="h2">
            {news.title}
          </Typography>
          <Typography variant="body2" noWrap color="textSecondary">
            {news.text}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

export default News;
export { NewsCard, News, SingleLineGridList };
