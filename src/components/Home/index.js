import React, { useState, useEffect, useContext, useMemo } from "react";
import { Route } from "react-router-dom";
import { useParams } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import CardMedia from "@material-ui/core/CardMedia";
import Box from "@material-ui/core/Box";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";

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
import * as IMAGES from "../../medias/images";

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
    setSummaryLoading(true);
    setTotalLoading(true);
    setError(null);
    getSummary(country)
    
      .then((data) => {
        setSummary(data);
        setSummaryLoading(false);
      })
      .catch((error) => {
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
        <Grid container direction="row" justify="center" spacing={1}>
          <Grid item>
            <CardMedia component="img" height="45px" src={IMAGES.VIRUS_ICON} />
          </Grid>
          <Grid item>
            <Typography variant="h3">COVID-19</Typography>
          </Grid>
        </Grid>
        <Typography variant="h4" color="textSecondary">
          Live Updates and Statistics
        </Typography>
        <Route path={ROUTES.COUNTRY}>
          <Grid container justify="center" alignItems="center">
            <Grid item className={classes.countryTitle} xs={10}>
              <Breadcrumbs
                separator={
                  <NavigateNextIcon
                    style={{ color: "white" }}
                    fontSize="large"
                  />
                }
                aria-label="breadcrumb"
              >
                <Link style={{ textDecoration: "none" }} href="/home">
                  <Box fontWeight="fontWeightBold" color="dodgerBlue">
                    Worldwide
                  </Box>
                </Link>
                <Typography style={{ color: "white" }}>{titleName}</Typography>
              </Breadcrumbs>
            </Grid>
          </Grid>
        </Route>

        {error && <Alert severity="error">{error.message}</Alert>}
        <Grid container justify="center" spacing={6}>
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
            <BarPlotWeek
              data={total}
              loading={loading}
              title={TITLES.DAILY_WEEK + titleName}
            />
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
          <Grid item xs={10}>
            <Typography align="center">
              Data Source:
              <Link href="https://covid19api.com/">
                COVID-19 API / Johns Hopkins CSSE
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

const transformCountryData = (data) => {
  let totalDeaths = data.map((item) => item.Deaths);
  let totalRecovered = data.map((item) => item.Recovered);
  let totalConfirmed = data.map((item) => item.Confirmed);
  let newDeaths = new Array(data.length);
  let newRecovered = new Array(data.length);
  let newConfirmed = new Array(data.length);
  newDeaths[0] = newConfirmed[0] = newRecovered[0] = 0;

  for (let i = 0; i < data.length - 1; i++) {
    newDeaths[i + 1] = totalDeaths[i + 1] - totalDeaths[i];
    newConfirmed[i + 1] = totalConfirmed[i + 1] - totalConfirmed[i];
    newRecovered[i + 1] = totalRecovered[i + 1] - totalRecovered[i];
  }

  let labels = data.map((item) => moment(item.Date).format("MM-DD"));

  return {
    labels: labels,
    totalDeaths: totalDeaths,
    newDeaths: newDeaths,
    totalRecoveries: totalRecovered,
    newRecoveries: newRecovered,
    totalConfirmed: totalConfirmed,
    newConfirmed: newConfirmed,
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
