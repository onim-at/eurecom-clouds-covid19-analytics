import React, { useState, useEffect, useContext } from "react";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import { NewsCard, LineGridList } from "../News";
import { FirebaseContext } from "../Firebase";
import { AuthUserContext } from "../Session";
import { withAuthorization } from "../Session";

import * as ROLES from "../../constants/roles";

const YourNews = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState([]);
  const firebase = useContext(FirebaseContext);
  const user = useContext(AuthUserContext);

  useEffect(() => {
    setLoading(true);
    setError("");
    firebase.getNewsByUser(user.uid).then((news) => {
      setNews(news);
      console.log(news);
      setLoading(false);
    });
  }, []);

  function deleteNews(id) {
    firebase.deleteNews(id);
    var filteredNews = news.filter(
      (data) => data.newsid.localeCompare(id) != 0
    );
    setNews(filteredNews);
  }

  return (
    <Container>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs={10}>
          <h1>Your News</h1>
        </Grid>

        <Grid item xs={10}>
          {!loading && (
            <LineGridList
              data={news.map((item) => (
                <NewsCard
                  news={item}
                  deleteNews={deleteNews}
                  showNews={() => false}
                  writer={true}
                />
              ))}
            />
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

const condition = (authUser) => authUser && !!authUser.roles[ROLES.WRITER];

export default withAuthorization(condition)(YourNews);
