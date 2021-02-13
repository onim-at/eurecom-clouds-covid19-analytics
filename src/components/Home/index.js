import React, { useState, useEffect, useContext, useMemo } from "react";
import { Route } from "react-router-dom";
import { useParams } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Alert from "@material-ui/lab/Alert";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Fade from "@material-ui/core/Fade";

import { FirebaseContext } from "../Firebase";
import API from "../../api";
import Statistics from "./statistics";
import NewsPage from "./newsPage";
import {transformCountryData, transformGlobalData} from "../../transform"

import * as styles from "./styles";
import * as ROUTES from "../../constants/routes";
import * as IMAGES from "../../medias/images";

const GLOBAL = "Worldwide";
const COUNTRIES = "Countries";

const Home = () => {
  const [summary, setSummary] = useState({});
  const [total, setTotal] = useState({});
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);
  const [summaryLoading, setSummaryLoading] = useState(true);
  const [totalLoading, setTotalLoading] = useState(true);
  const [newsLoading, setNewsLoading] = useState(true);
  const [showStatistics, setShowStatistics] = useState(true);
  const firebase = useContext(FirebaseContext);
  const classes = styles.useStyles();
  const { country } = useParams();
  const isGlobal = country ? false : true;

  useEffect(() => {
    var getSummary = isGlobal ? API.getSummary : firebase.getSummaryByCountry;
    var getTotal = isGlobal ? API.getTotalGlobal : API.getTotalByCountry;
    var newsLocation = country ? country : 'worldwide';

    setSummaryLoading(true);
    setTotalLoading(true);
    setNewsLoading(true);
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

    firebase.getNewsByLocation(newsLocation).then((news) => {
      setNews(news);
      setNewsLoading(false);
    }).catch((error) => {
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
            <img height="45px" width="45px" src={IMAGES.VIRUS_ICON} />
          </Grid>
          <Grid item>
            <Typography variant="h3">COVID-19</Typography>
          </Grid>
        </Grid>
        <Typography variant="h5" color="textSecondary">
          Live Updates and Statistics
        </Typography>

        <Route path={ROUTES.COUNTRY}>
          <CountryTitle titleName={titleName} classes={classes} />
        </Route>

        <Paper>
          <Tabs
            indicatorColor="primary"
            textColor="primary"
            value={showStatistics}
            onChange={(event, value) => {
              setShowStatistics(value);
            }}
            centered
            variant="fullWidth"
          >
            <Tab value={true} label="Statistics" />
            <Tab value={false} label="News" />
          </Tabs>
        </Paper>

        {error && <Alert severity="error">{error.message}</Alert>}

        <Fade in={showStatistics} mountOnEnter unmountOnExit>
          <div style={{ overflowX: "hidden"}}>
            <Statistics
              summary={summary}
              total={total}
              loading={loading}
              titleName={titleName}
            />
          </div>
        </Fade>

        <Fade in={!showStatistics} mountOnEnter unmountOnExit>
          <div style={{ overflowX: "hidden"}}>
            <NewsPage loading={newsLoading} newsList={news}/>
          </div>
        </Fade>
        <Footer />
      </div>
    </Container>
  );
};

const CountryTitle = ({ titleName, classes }) => (
  <Grid container justify="center" alignItems="center">
    <Grid item className={classes.countryTitle} xs={10}>
      <Breadcrumbs
        separator={
          <NavigateNextIcon style={{ color: "white" }} fontSize="large" />
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
);

const Footer = () => (
  <Box m={4}>
    <Typography align="center">
      Data Source:
      <Link href="https://covid19api.com/">
        COVID-19 API / Johns Hopkins CSSE
      </Link>
    </Typography>
  </Box>
);

export default Home;
