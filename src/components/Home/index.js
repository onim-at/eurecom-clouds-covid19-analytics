import React, { useState, useEffect, useContext, useMemo } from "react";
import { Route } from "react-router-dom";
import { useParams } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import { SummaryTable, LineChartTotal } from "../Analytics";
import { FirebaseContext } from "../Firebase";
import * as styles from "../../styles/styles";
import * as TITLES from "../../constants/titles";
import * as ROUTES from "../../constants/routes";
import Alert from "@material-ui/lab/Alert";

const Home = () => {
  const [summary, setSummary] = useState({});
  const [live, setLive] = useState({});
  const [error, setError] = useState(null);
  const [summaryLoading, setSummaryLoading] = useState(true);
  const [liveLoading, setLiveLoading] = useState(true);
  const firebase = useContext(FirebaseContext);
  const classes = styles.useStyles();
  const { country } = useParams();

  const location = useMemo(
    () => ({ Location: country ? "Countries" : "Global", Slug: country }),
    [country]
  );

  useEffect(() => {
    firebase
      .getSummary(location)
      .then((data) => {
        setSummary(data);
        setSummaryLoading(false);
      })
      .catch((error) => {
        setError(error);
      });

    if (location.Slug) {
      firebase
        .getLiveByCountry(location.Slug)
        .then((data) => {
          setLive(data);
          setLiveLoading(false)
        })
        .catch((error) => {
          setError(error);
        });
    }
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
              loading={summaryLoading}
              title={TITLES.SUMMARY + titleName}
            />
          </Grid>
          <Route path={ROUTES.COUNTRY}>
            <Grid item xs={10}>
              <LineChartTotal
                data={live}
                title={TITLES.DAILY_TOTAL + titleName}
                loading={liveLoading}
              />
            </Grid>
          </Route>
        </Grid>
      </div>
    </Container>
  );
};

export default Home;
