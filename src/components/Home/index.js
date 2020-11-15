import React, { useState, useEffect, useContext, useMemo } from "react";
import { Route } from "react-router-dom";
import { useParams } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import {
  SummaryTable,
  SummaryPie,
  LineChartTotal,
  SummaryTableCountry,
  BarPlotWeek,
} from "../Analytics";
import { FirebaseContext } from "../Firebase";
import API from "../../api";
import * as styles from "../../styles/styles";
import * as TITLES from "../../constants/titles";
import * as ROUTES from "../../constants/routes";
import Alert from "@material-ui/lab/Alert";

const moment = require("moment");

const GLOBAL = "Global";
const COUNTRIES = "Countries";

const Home = () => {
  const [summary, setSummary] = useState({});
  const [total, setTotal] = useState({});
  const [error, setError] = useState(null);
  const [summaryLoading, setSummaryLoading] = useState(true);
  const [totalLoading, setTotalLoading] = useState(true);
  const firebase = useContext(FirebaseContext);
  const classes = styles.useStyles();
  const { country } = useParams();
  const isGlobal = country ? false : true;

  useEffect(() => {
    var getSummary = isGlobal ? API.getSummary : firebase.getSummaryByCountry;
    var getTotal = isGlobal ? API.getTotalGlobal : API.getTotalByCountry;

    getSummary(country)
      .then((data) => {
        console.log(data);
        setSummary(data);
        setSummaryLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      });

    getTotal(country)
      .then((data) => {
        data = isGlobal
          ? transformGlobalData(data)
          : transformCountryData(data);
        setTotal(data);
        setTotalLoading(false);
      })
      .catch((error) => {
        setError(error);
      });
  }, [firebase, country, isGlobal]);

  let loading = summaryLoading || totalLoading;

  let titleName = country ? summary.Country : GLOBAL;
  titleName = loading ? "Loading..." : titleName;

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
              loading={loading}
              title={TITLES.SUMMARY + titleName}
            />
          </Grid>
          <Grid item xs={10}>
            <SummaryPie
              data={summary}
              loading={loading}
              title={TITLES.DISTRIBUTION + titleName}
            />
          </Grid>
          <Grid item xs={10}>
            <Route path={ROUTES.HOME}>
              <BarPlotWeek
                data={total}
                loading={loading}
                title={TITLES.DAILY_WEEK + titleName}
              />
            </Route>
          </Grid>
          <Grid item xs={10}>
            <LineChartTotal
              data={total}
              title={TITLES.DAILY_TOTAL + titleName}
              loading={loading}
            />
          </Grid>
          <Route path={ROUTES.HOME}>
            <Grid item xs={10}>
              <SummaryTableCountry
                data={summary.Countries}
                title={TITLES.COUNTRY}
                loading={loading}
              />
            </Grid>
          </Route>
        </Grid>
      </div>
    </Container>
  );
};

const transformCountryData = (data) => {
  let deaths = data.map((item) => item.Deaths);
  let recovered = data.map((item) => item.Recovered);
  let confirmed = data.map((item) => item.Confirmed);
  let labels = data.map((item) => moment(item.Date).format("MM-DD"));
  return {
    labels: labels,
    totalDeaths: deaths,
    totalRecoveries: recovered,
    totalConfirmed: confirmed,
  };
};

const transformGlobalData = (data) => {
  let start = moment("2020-04-12");
  let sorting = function (a, b) {
    return a[0] - b[0];
  };

  data.sort((a, b) => a.TotalConfirmed - b.TotalConfirmed);
  let deaths = data
    .map((item) => [item.TotalDeaths, item.NewDeaths])
    .sort(sorting);
  let totalDeaths = deaths.map((item) => item[0]);
  let newDeaths = deaths.map((item) => item[1]);
  let recovered = data
    .map((item) => [item.TotalRecovered, item.NewRecovered])
    .sort(sorting);
  let totalRecovered = recovered.map((item) => item[0]);
  let newRecovered = recovered.map((item) => item[1]);
  let confirmed = data
    .map((item) => [item.TotalConfirmed, item.NewConfirmed])
    .sort(sorting);
  let totalConfirmed = confirmed.map((item) => item[0]);
  let newConfirmed = confirmed.map((item) => item[1]);
  let labels = data.map((item) => start.add(1, "days").format("MM-DD"));

  return {
    labels: labels,
    totalConfirmed: totalConfirmed,
    newConfirmed: newConfirmed,
    totalRecoveries: totalRecovered,
    newRecoveries: newRecovered,
    totalDeaths: totalDeaths,
    newDeaths: newDeaths,
  };
};

export default Home;
