import React from "react";

import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import LinearProgress from "@material-ui/core/LinearProgress";
import { DataGrid } from "@material-ui/data-grid";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import { Pie, Line, Bar } from "react-chartjs-2";

import * as CONSTANTS from "../../constants/routes";
import * as styles from "../../styles/styles";
import * as COLORS from "../../constants/colors";

const moment = require("moment");

const SummaryTable = ({ data, title, loading }) => {
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const percentage = (x, y) => ((x / y) * 100).toFixed(2) + "%";

  const getRows = (data) => [
    {
      id: 1,
      measure: "Total Cases",
      value: data.TotalConfirmed,
      bg: COLORS.CONFIRMED,
    },
    {
      id: 2,
      measure: "New Cases",
      value: data.NewConfirmed,
      bg: COLORS.CONFIRMED,
    },
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
    {
      id: 7,
      measure: "Total Deaths",
      value: data.TotalDeaths,
      bg: COLORS.DEATHS,
    },
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

const SummaryPie = ({ data, title, loading }) => {
  const getData = (data) => ({
    labels: ["Death Cases", "Recovered Cases", "Active Cases"],
    datasets: [
      {
        data: [data.TotalDeaths, data.TotalRecovered, data.TotalConfirmed],
        backgroundColor: [COLORS.DEATHS, COLORS.RECOVERED, COLORS.CONFIRMED],
      },
    ],
  });

  return (
    <>
      <Title title={title} />
      {loading && <LinearProgress />}
      {!loading && <Pie data={getData(data)} />}
    </>
  );
};

const BarPlotWeek = ({ data, title, loading, transformData }) => {
  const getData = (data) => {
    var len = 7;
    var [labels, deaths, recovered, confirmed] = transformData(data);
    return {
      labels: labels.slice(-len),
      datasets: [
        {
          backgroundColor: COLORS.DEATHS,
          label: "Total deaths",
          data: deaths.slice(-len),
        },
        {
          backgroundColor: COLORS.RECOVERED,
          label: "Total Recovered",
          data: recovered.slice(-len),
        },
        {
          backgroundColor: COLORS.CONFIRMED,
          label: "Total Cases",
          data: confirmed.slice(-len),
        },
      ],
    };
  };

  const options = {
    responsive: true,
    legend: {
      display: false,
    },
    type: "bar",
  };
  return (
    <>
      <Title title={title} />
      {loading && <LinearProgress />}
      {!loading && <Bar data={getData(data)} options={options} />}
    </>
  );
};

const LineChartTotal = ({
  data,
  title,
  loading,
  transformData = (data) => data,
}) => {
  const getData = (data) => {
    var [labels, deaths, recovered, confirmed] = transformData(data);
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

const SummaryTableCountry = ({ data, title, loading }) => {
  const classes = styles.useTableStyles();

  const columns = [
    { field: "id", hide: true },
    {
      field: "country",
      headerName: "Country",
      width: 200,
      cellClassName: "country--cell",
      renderCell: (params) => (
        <Button href={CONSTANTS.COUNTRY_BASE + "/" + params.value.Slug}>
          {params.value.Country}
        </Button>
      ),
    },
    {
      field: "newCases",
      headerName: "New Cases",
      width: 110,
      cellClassName: "confirmed--cell",
    },
    {
      field: "totalCases",
      headerName: "Total Cases",
      width: 135,
      cellClassName: "confirmed--cell",
    },
    {
      field: "newRecoveries",
      headerName: "New Recoveries",
      width: 138,
      cellClassName: "recovered--cell",
    },
    {
      field: "totalRecoveries",
      headerName: "Total Recoveries",
      width: 140,
      cellClassName: "recovered--cell",
    },
    {
      field: "newDeaths",
      headerName: "New Deaths",
      width: 110,
      cellClassName: "deaths--cell",
    },
    {
      field: "totalDeaths",
      headerName: "Total Deaths",
      width: 130,
      cellClassName: "deaths--cell",
    },
  ];

  const getRows = (data) => {
    return data.map((item, index) => ({
      id: index,
      country: item,
      totalCases: item.TotalConfirmed,
      totalRecoveries: item.TotalRecovered,
      totalDeaths: item.TotalDeaths,
    }));
  };

  return (
    <>
      <Title title={title} />
      {loading && <LinearProgress />}
      {!loading && (
        <Box style={{ height: 520, width: "100%" }} className={classes.root}>
          <DataGrid rows={getRows(data)} columns={columns} pageSize={20} />
        </Box>
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

export {
  SummaryTable,
  SummaryPie,
  LineChartTotal,
  SummaryTableCountry,
  BarPlotWeek,
};
