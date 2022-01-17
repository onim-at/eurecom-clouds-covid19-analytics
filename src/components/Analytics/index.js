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
import Button from "@material-ui/core/Button";
import { Pie, Line, Bar } from "react-chartjs-2";

import * as CONSTANTS from "../../constants/routes";
import * as styles from "./styles";
import * as COLORS from "../../constants/colors";

const SummaryTable = ({ data, title, loading }) => {
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const percentage = (x, y) => ((x / y) * 100).toFixed(2) + "%";

  const getRows = (data) => [
    {
      id: 1,
      measure: "Cases",
      value: data.confirmed,
      bg: COLORS.CONFIRMED,
    },
    {
      id: 2,
      measure: "Deaths",
      value: data.deaths,
      bg: COLORS.DEATHS,
    },
    {
      id: 3,
      measure: "Fully vaccinated",
      value: data.people_vaccinated,
      bg: COLORS.VACCINATED,
    },
    {
      id: 4,
      measure: "Partially vaccinated",
      value: data.people_partially_vaccinated,
      bg: COLORS.VACCINATED,
    },
    {
      id: 5,
      measure: "Shots given",
      value: data.administered,
      bg: COLORS.VACCINATED,
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
    labels: ["Death Cases", "Total cases"],
    datasets: [
      {
        data: [data.TotalDeaths, data.TotalConfirmed],
        backgroundColor: [COLORS.DEATHS, COLORS.CONFIRMED],
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

const BarPlotWeek = ({ data, title, loading }) => {
  const getData = (data) => {
    var len = 7;

    return {
      labels: data.labels.slice(-len),
      datasets: [
        {
          backgroundColor: COLORS.DEATHS,
          label: "Total deaths",
          data: data.newDeaths.slice(-len),
        },
        {
          backgroundColor: COLORS.CONFIRMED,
          label: "Total Cases",
          data: data.newConfirmed.slice(-len),
        },
      ],
    };
  };

  const options = {
    responsive: true,
    legend: {
      display: true,
      position: "top",
    },
  };
  return (
    <>
      <Title title={title} />
      {loading && <LinearProgress />}
      {!loading && <Bar data={getData(data)} options={options} />}
    </>
  );
};

const LineChartTotal = ({ data, title, loading }) => {
  const getData = (data) => {
    return {
      labels: data.labels,
      datasets: [
        {
          borderColor: COLORS.DEATHS,
          backgroundColor: COLORS.DEATHS_BG,
          label: "Total deaths",
          data: data.totalDeaths,
        },
        {
          borderColor: COLORS.CONFIRMED,
          backgroundColor: COLORS.CONFIRMED_BG,
          label: "Total Cases",
          data: data.totalConfirmed,
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
  const classes = styles.useStyles();

  const columns = [
    { field: "id", hide: true },
    {
      field: "country",
      headerName: "Country",
      flex: 1,
      cellClassName: "country--cell",
      renderCell: (params) => (
        <Button
          style={{ color: "white" }}
          href={CONSTANTS.HOME_BASE + "/" + params.value.Slug}
        >
          {params.value.Country}
        </Button>
      ),
      sortComparator: (v1, v2, row1, row2) => {
        return row1.value.Country.localeCompare(row2.value.Country);
      },
    },
    {
      field: "newCases",
      headerName: "New Cases",
      flex: 1,
      cellClassName: "confirmed--cell",
    },
    {
      field: "totalCases",
      headerName: "Total Cases",
      flex: 1,
      cellClassName: "confirmed--cell",
    },
    {
      field: "newDeaths",
      headerName: "New Deaths",
      flex: 1,
      cellClassName: "deaths--cell",
    },
    {
      field: "totalDeaths",
      headerName: "Total Deaths",
      flex: 1,
      cellClassName: "deaths--cell",
    },
  ];

  const getRows = (data) => {
    return data.map((item, index) => ({
      id: index,
      country: item,
      newCases: item.NewConfirmed,
      totalCases: item.TotalConfirmed,
      newDeaths: item.NewDeaths,
      totalDeaths: item.TotalDeaths,
    }));
  };

  return (
    <>
      <Title title={title} />
      {loading && data == null && <LinearProgress />}
      {!loading && data != null && (
        <Box
          style={{ height: 520, width: "100%", borderColor: "white" }}
          className={classes.root}
        >
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
