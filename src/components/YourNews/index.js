import React, { useState, useEffect, useContext } from "react";

import { NewsCard, SingleLineGridList } from "../News";
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
      setLoading(false);
      console.log(news);
    });
  }, []);


  return (
    <div>
      <h1>Your News</h1>
      <p> Accessible only to Writer user. </p>
      {!loading && <NewsCard news={news[0]}  />}
      {!loading && <SingleLineGridList data={news.map((item) => <NewsCard news={item}/>)}></SingleLineGridList>}
    </div>
  );
};

const condition = (authUser) => authUser && !!authUser.roles[ROLES.WRITER];

export default withAuthorization(condition)(YourNews);
