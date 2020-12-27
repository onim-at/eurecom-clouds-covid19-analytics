import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";

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
import ListSubheader from "@material-ui/core/ListSubheader";
import ReactMarkdown from "react-markdown";

import { withRouter } from "react-router-dom";

import * as ROUTES from "../../constants/routes";
import * as styles from "../../styles/styles";

class News {
  constructor(
    location,
    title,
    image,
    imagePath,
    content,
    userid,
    username,
    date
  ) {
    this.location = location;
    this.title = title;
    this.image = image;
    this.imagePath = imagePath;
    this.content = content;
    this.userid = userid;
    this.username = username;
    this.date = date;
  }

  static from(data) {
    return new News(
      data.location,
      data.title,
      data.image,
      data.imagePath,
      data.content,
      data.userid,
      data.username,
      data.date
    );
  }
}

const LineGridList = ({ data }) => {
  const classes = styles.useGridSlideStyles();

  return (
    <div className={classes.root}>
      <GridList
        style={{ flexWrap: "nowrap" }}
        className={classes.gridList}
        cols={5}
      >
        {data.map((tile, index) => (
          <GridListTile className={classes.gridListTile} key={index}>
            {tile}
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};

const BaseNewsCard = ({ history, news, writer, showNews, deleteNews }) => {
  const classes = styles.useCardStyles();

  function modifyNews(news) {
    var url = ROUTES.MODIFY_NEWS_BASE + "/" + news.newsid;
    history.push(url, news);
  }

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={() => showNews(news)}>
        <CardHeader
          className={classes.header}
          title={news.title}
          subheader={news.date + ", @" + news.username}
        />
        <CardMedia
          className={classes.media}
          image={news.image}
          title={news.title}
        />
      </CardActionArea>
      {writer && (
        <CardActions>
          <Button size="small" color="primary" onClick={() => modifyNews(news)}>
            Modify
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={() => deleteNews(news.newsid)}
          >
            Delete
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

const DisplayNews = ({ news }) => {
  var imgStyle = {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    width: "50%",
  };

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      spacing={3}
    >
      <Grid item>
        <Typography variant="h2">{news.title}</Typography>
      </Grid>
      <Grid item>
        {news.image && 
        <img style={imgStyle} src={news.image} />}
      </Grid>
      <Grid item>
        <ReactMarkdown skipHtml>{news.content}</ReactMarkdown>
      </Grid>
      <Grid item>
        <Typography variant="h6" color="textSecondary">
          {news.date}, @{news.username}
        </Typography>
      </Grid>
    </Grid>
  );
};

const NewsCard = withRouter(BaseNewsCard);

export default News;
export { NewsCard, News, LineGridList, DisplayNews };
