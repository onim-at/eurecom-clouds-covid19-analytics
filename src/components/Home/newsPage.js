import React from "react";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import { NewsCard, LineGridList } from "../News";

const NewsPage = ({ loading, news }) => {
  return (
    <Grid container justify="center" spacing={6}>
      <Grid item xs={10}>
      </Grid>
      {loading && <LinearProgress />}
      {!loading && (
        <Grid item xs={10}>
          <LineGridList
            data={news.map((item) => (
              <NewsCard news={item} />
            ))}
          />
        </Grid>
      )}
    </Grid>
  );
};

export default NewsPage;
