import React from "react";
import Grid from "@material-ui/core/Grid";

import {NewsCard, SingleLineGridList} from "../News"

const NewsPage = () => {
  return (
    <Grid container justify="center" spacing={6}>
      <Grid item xs={10}>
        NEWS
      </Grid>
      <Grid item xs={10}>
        <NewsCard />
      </Grid>
      <Grid item xs={10}>
        <SingleLineGridList/>
      </Grid>
    </Grid>
  );
};


export default NewsPage;
