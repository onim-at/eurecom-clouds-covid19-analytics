import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import { NewsCard, LineImageList, DisplayNews } from "../News";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import IconButton from "@material-ui/core/IconButton";

const NewsPage = ({ loading, newsList }) => {
  const [showList, setShowList] = useState(true);
  const [currentNews, setCurrentNews] = useState({});

  function showSelectedNews(news) {
    setCurrentNews(news);
    setShowList(false);
  }

  return (
    <Grid container justifyContent="center" spacing={2}>
      <Grid item xs={10}></Grid>
      {loading && <LinearProgress />}
      {!loading && (
        <Grid item xs={10}>
          {showList && (
            <NewsList newsList={newsList} showNews={showSelectedNews} />
          )}
          {!showList && (
            <>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                onClick={() => {
                  setShowList(true);
                }}
              >
                <KeyboardBackspaceIcon />
              </IconButton>
              <DisplayNews news={currentNews} />
            </>
          )}
        </Grid>
      )}
    </Grid>
  );
};

function NewsList({ newsList, showNews }) {
  return (
    <LineImageList
      data={newsList.map((item) => (
        <NewsCard news={item} writer={false} showNews={showNews} />
      ))}
    />
  );
}

export default NewsPage;
