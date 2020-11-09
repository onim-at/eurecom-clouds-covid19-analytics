import React, { useState, useEffect, useContext } from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import LinearProgress from "@material-ui/core/LinearProgress";

import { FirebaseContext } from "../Firebase";
import * as styles from "../../styles/styles";

const moment = require('moment');

const Home = () => {
  const [summary, setSummary] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const firebase = useContext(FirebaseContext);
  const classes = styles.useStyles();

  useEffect(() => {
    firebase
      .getSummary(moment().format("YYYY-MM-DD"))
      .then((data) => {
        setSummary(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  return (
    <Container>
      <div className={classes.paper}>
        <Typography variant="h3">Covid-19</Typography>
        <Typography variant="h5" color="textSecondary">
          Live Updates and Statistics
        </Typography>
        <hr />
        <Grid container justify="center">
          <Grid item xs={10}>
            <SummaryTable data={summary.Global} loading={loading} />
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

const SummaryTable = ({ data, loading }) => {
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const percentage = (x, y) => ((x / y) * 100).toFixed(2) + "%";

  const getRows = (data) => [
    { id: 1, measure: "Total Cases", value: data.TotalConfirmed, bg: "khaki" },
    { id: 2, measure: "New Cases", value: data.NewConfirmed, bg: "khaki" },
    {
      id: 3,
      measure: "Active Cases",
      value: data.TotalConfirmed - data.TotalRecovered,
      bg: "khaki",
    },
    {
      id: 4,
      measure: "Total Recovered",
      value: data.TotalRecovered,
      bg: "LightSkyBlue",
    },
    {
      id: 5,
      measure: "New Recovered",
      value: data.NewRecovered,
      bg: "LightSkyBlue",
    },
    {
      id: 6,
      measure: "Recovery Rate",
      value: percentage(data.TotalRecovered, data.TotalConfirmed),
      bg: "LightSkyBlue",
    },
    { id: 7, measure: "Total Deaths", value: data.TotalDeaths, bg: "Tomato" },
    { id: 8, measure: "New Deaths", value: data.NewDeaths, bg: "Tomato" },
    {
      id: 9,
      measure: "Mortality Rate",
      value: percentage(data.TotalDeaths, data.TotalConfirmed),
      bg: "Tomato",
    },
  ];

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow style={{ background: "Beige" }}>
            <TableCell align="left">
              <Typography variant="h6">
                Corona Virus Summary Worldwide
              </Typography>
              {loading && <LinearProgress />}
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        {!loading && (
          <TableBody>
            {getRows(data).map((row) => (
              <TableRow style={{ background: row.bg }} key={row.id}>
                <TableCell>{row.measure}</TableCell>
                <TableCell align="right">
                  {numberWithCommas(row.value)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
};

export default Home;
