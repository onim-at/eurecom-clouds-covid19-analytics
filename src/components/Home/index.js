import React, { useState, useEffect, useContext, useMemo } from "react";
import { useParams } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import { SummaryTable } from "../Analytics";
import { FirebaseContext } from "../Firebase";
import * as styles from "../../styles/styles";
import * as titles from "../../constants/titles";
import Alert from "@material-ui/lab/Alert";

const moment = require("moment");

const Home = () => {
  const [summary, setSummary] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const firebase = useContext(FirebaseContext);
  const classes = styles.useStyles();
  const { country } = useParams();

  const location = useMemo(
    () => ({ Location: country ? "Countries" : "Global", Slug: country }),
    [country]
  );

  useEffect(() => {
    firebase
      .getSummary(moment().format("YYYY-MM-DD"), location)
      .then((data) => {
        setSummary(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
      });
  }, [firebase, location]);

  let titleName = country ? summary.Country : "Global";

  return (
    <Container>
      <div className={classes.paper}>
        <Typography variant="h3">Covid-19</Typography>
        <Typography variant="h5" color="textSecondary">
          Live Updates and Statistics
        </Typography>
        <hr />
        {error && <Alert>{error.message}</Alert>}
        <Grid container justify="center">
          <Grid item xs={10}>
            <SummaryTable
              data={summary}
              loading={loading}
              title={titles.SUMMARY + titleName}
            />
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default Home;
