import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Alert from "@material-ui/lab/Alert";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Fade from "@material-ui/core/Fade";

import { FirebaseContext } from "../../firebase";
import Statistics from "./statistics";
import NewsPage from "./newsPage";
import { transformHistory } from "../../transform";

import * as styles from "./styles";
import * as IMAGES from "../../medias/images";

const Home = (summary, summaryLoading) => {
  const [history, setHistory] = useState({});
  const [news, setNews] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [newsLoading, setNewsLoading] = useState(true);
  const [showStatistics, setShowStatistics] = useState(1);
  const [error, setError] = useState(null);

  const firebase = useContext(FirebaseContext);
  const classes = styles.useStyles();
  const { country } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        let history = await firebase.getHistory(country);
        setHistory(transformHistory(history));
        setHistoryLoading(false);

        let news = await firebase.getNewsByLocation(country);
        setNews(news);
        setNewsLoading(false);
      } catch (error) {
        setError(error);
      }
    }

    setHistoryLoading(true);
    setNewsLoading(true);
    setError(null);

    fetchData()

    return () => {
      setHistoryLoading(true);
      setNewsLoading(true);
      setError(null);
    };
  }, [firebase, country]);

  let loading = summaryLoading || historyLoading;
  return (
    <Container className={classes.paper}>
      <Grid container direction="row" justifyContent="center" spacing={1}>
        <Grid item>
          <img
            height="45px"
            width="45px"
            src={IMAGES.VIRUS_ICON}
            alt="covid-img"
          />
        </Grid>
        <Grid item>
          <Typography variant="h3">COVID-19</Typography>
        </Grid>
      </Grid>
      <Typography variant="h5" color="textSecondary">
        Live Updates and Statistics
      </Typography>

      <Paper className={classes.grow}>
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
          <Tab value={1} index={1} label="Statistics" />
          <Tab value={0} index={0} label="News" />
        </Tabs>
      </Paper>

      {country !== "Global" && (
        <CountryTitle titleName={country} classes={classes} />
      )}

      {error && <Alert severity="error">{error.message}</Alert>}
      {/*
        <Fade in={Boolean(showStatistics)} mountOnEnter unmountOnExit>
          <Statistics
            country={country}
            summary={summary}
            history={history}
            loading={loading}
            titleName={country}
          />
        </Fade>
        */}
      <Fade in={!showStatistics} mountOnEnter unmountOnExit>
        <NewsPage loading={newsLoading} newsList={news} />
      </Fade>
      <Footer />
    </Container>
  );
};

const CountryTitle = ({ titleName, classes }) => (
  <Grid container justifyContent="center" alignItems="center">
    <Grid item className={classes.countryTitle} xs={10}>
      <Breadcrumbs
        separator={
          <NavigateNextIcon style={{ color: "white" }} fontSize="large" />
        }
        aria-label="breadcrumb"
      >
        <Link style={{ textDecoration: "none" }} to="/home">
          <Box fontWeight="fontWeightBold" color="Lightskyblue">
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
      <a href="https://mmediagroup.fr/covid-19">MMedia Group</a>
    </Typography>
  </Box>
);

export default Home;
