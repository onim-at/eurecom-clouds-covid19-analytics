import React, { useState, useEffect, useContext, useMemo } from "react";
import { Route } from "react-router-dom";
import { useParams } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import { SummaryTable, SummaryPie, LineChartTotal, SummaryTableCountry } from "../Analytics";
import { FirebaseContext } from "../Firebase";
import * as styles from "../../styles/styles";
import * as TITLES from "../../constants/titles";
import * as ROUTES from "../../constants/routes";
import Alert from "@material-ui/lab/Alert";

const Home = () => {
  const [summary, setSummary] = useState({});
  const [total, setTotal] = useState({});
  const [error, setError] = useState(null);
  const [summaryLoading, setSummaryLoading] = useState(true);
  const [totalLoading, setTotalLoading] = useState(true);
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
        .getTotalByCountry(location.Slug)
        .then((data) => {
          setTotal(data);
          setTotalLoading(false);
        })
        .catch((error) => {
          console.log(error);
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
        {error && <Alert severity="error">{error.message}</Alert>}
        <Grid container justify="center">
          <Grid item xs={10}>
            <SummaryTable
              data={summary}
              loading={summaryLoading}
              title={TITLES.SUMMARY + titleName}
            />
          </Grid>
          <Grid item xs={10}>
            <SummaryPie
              data={summary}
              loading={summaryLoading}
              title={TITLES.DISTRIBUTION + titleName}
            />
          </Grid>
          <Route path={ROUTES.COUNTRY}>
            <Grid item xs={10}>
              <LineChartTotal
                data={total}
                title={TITLES.DAILY_TOTAL + titleName}
                loading={totalLoading}
              />
            </Grid>
          </Route>
          <Route path={ROUTES.HOME}>
            <Grid item xs={10}>
              <SummaryTableCountry
                data={summary.Countries}
                title={TITLES.COUNTRY + titleName}
                loading={summaryLoading}
              />
            </Grid>
          </Route>
        </Grid>
      </div>
    </Container>
  );
};

export default Home;
