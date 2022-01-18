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

const BarPlotWeek = ({ label, data, title, loading, color }) => {
  const getData = (data) => {
    var len = 7;

    return {
      labels: label.slice(-len),
      datasets: [
        {
          backgroundColor: color,
          data: data.slice(-len),
        },
      ],
    };
  };

  const options = {
    responsive: true,
    legend: {
      display: false,
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

const LineChartTotal = ({
  data,
  labels,
  title,
  loading,
  borderColor,
  backgroundColor,
}) => {
  return (
    <>
      <Title title={title} />
      {loading && <LinearProgress />}
      {!loading && (
        <Line
          data={{
            labels: labels,
            datasets: [
              {
                borderColor: borderColor,
                backgroundColor: backgroundColor,
                data: data,
              },
            ],
          }}
          options={{
            legend: {
              display: false,
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
          href={CONSTANTS.HOME_BASE + "/" + params.value}
        >
          {params.value}
        </Button>
      ),
      sortComparator: (v1, v2, row1, row2) => {
        return row1.value.localeCompare(row2.value);
      },
    },
    {
      field: "confirmed",
      headerName: "Cases",
      flex: 1,
      cellClassName: "confirmed--cell",
    },
    {
      field: "deaths",
      headerName: "Deaths",
      flex: 1,
      value: data.deaths,
      cellClassName: "deaths--cell",
    },
    {
      headerName: "Vaccinated",
      field: "people_vaccinated",
      flex: 1,
      cellClassName: "vaccines--cell",
    },
    {
      headerName: "Partially Vaccinated",
      field: "people_partially_vaccinated",
      flex: 1,
      cellClassName: "vaccines--cell",
    },
    {
      headerName: "Shots given",
      field: "administered",
      flex: 1,
      cellClassName: "vaccines--cell",
    },
  ];
  
  const getRows = (data) => {
    return Object.keys(data).map((item, index) => ({
      id: index,
      country: item,
      confirmed: data[item].confirmed,
      deaths: data[item].deaths,
      people_vaccinated: data[item].people_vaccinated,
      people_partially_vaccinated: data[item].people_partially_vaccinated,
      administered: data[item].administered,
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
