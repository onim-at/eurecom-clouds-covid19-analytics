import React from "react";

import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import LinearProgress from "@material-ui/core/LinearProgress";

import { Line } from "react-chartjs-2";

import * as COLORS from "../../constants/colors"

const moment = require("moment");

const SummaryTable = ({ data, title, loading }) => {
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const percentage = (x, y) => ((x / y) * 100).toFixed(2) + "%";

  const getRows = (data) => [
    { id: 1, measure: "Total Cases", value: data.TotalConfirmed, bg: COLORS.CONFIRMED },
    { id: 2, measure: "New Cases", value: data.NewConfirmed, bg: COLORS.CONFIRMED },
    {
      id: 3,
      measure: "Active Cases",
      value: data.TotalConfirmed - data.TotalRecovered,
      bg: COLORS.CONFIRMED,
    },
    {
      id: 4,
      measure: "Total Recovered",
      value: data.TotalRecovered,
      bg: COLORS.RECOVERED,
    },
    {
      id: 5,
      measure: "New Recovered",
      value: data.NewRecovered,
      bg: COLORS.RECOVERED,
    },
    {
      id: 6,
      measure: "Recovery Rate",
      value: percentage(data.TotalRecovered, data.TotalConfirmed),
      bg: COLORS.RECOVERED,
    },
    { id: 7, measure: "Total Deaths", value: data.TotalDeaths, bg: COLORS.DEATHS },
    { id: 8, measure: "New Deaths", value: data.NewDeaths, bg: COLORS.DEATHS },
    {
      id: 9,
      measure: "Mortality Rate",
      value: percentage(data.TotalDeaths, data.TotalConfirmed),
      bg: COLORS.DEATHS,
    },
  ];

  return (
    <>
      <Title title={title} />
      {loading && <LinearProgress />}
      <TableContainer>
        <Table>
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
    </>
  );
};

const LineChartTotal = ({ data, title, loading }) => {
  const getData = (data) => {
    console.log(data)
    let deaths = data.map((item) => item.Deaths);
    let recovered = data.map((item) => item.Recovered);
    let confirmed = data.map((item) => item.Confirmed);
    let labels = data.map((item) => moment(item.Date).format("MM-DD"));
    console.log(recovered)
    return {
      labels: labels,
      datasets: [
        {
          borderColor: COLORS.DEATHS,
          backgroundColor: COLORS.DEATHS_BG,
          label: "Total deaths",
          data: deaths,
        },
        {
          borderColor: COLORS.RECOVERED,
          backgroundColor: COLORS.RECOVERED_BG,
          label: "Total Recovered",
          data: recovered,
        },
        {
          borderColor: COLORS.CONFIRMED,
          backgroundColor: COLORS.CONFIRMED_BG,
          label: "Total Cases",
          data: confirmed,
        },
      ],
    };
  };

  return (
    <>
      <Title title={title} />
      {loading && <LinearProgress />}
      {!loading && (
        <Line
          data={getData(data)}
          options={{
            legend: {
              display: true,
              position: "top",
            },
          }}
        />
      )}
    </>
  );
};

const Title = ({ title }) => (
  <Typography variant="h5" style={{ background: "Beige" }}>
    <Box p={1} m={1} fontWeight="fontWeightBold">
      {title}
    </Box>
  </Typography>
);

export { SummaryTable, LineChartTotal };
