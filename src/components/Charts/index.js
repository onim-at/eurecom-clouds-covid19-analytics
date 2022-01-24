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
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import * as ROUTES from "../../constants/routes";
import * as styles from "./styles";
import * as COLORS from "../../constants/colors";

const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const percentage = (x, y) => ((x / y) * 100).toFixed(2);

const SummaryTable = ({ data }) => {
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
      measure: "At least one dose",
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
    <TableContainer>
      <Table>
        <TableBody>
          {getRows(data).map((row) => (
            <TableRow style={{ background: row.bg }} key={row.id}>
              <TableCell>{row.measure}</TableCell>
              <TableCell align="right">{numberWithCommas(row.value)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const SummaryPie = ({ data }) => {
  const getData = (data) => {
    let vaccinated = percentage(data.people_vaccinated, data.population);
    let partially_vaccinated = percentage(
      data.people_partially_vaccinated - data.people_vaccinated,
      data.population
    );
    let non_vaccinated = percentage(
      data.population - data.people_partially_vaccinated,
      data.population
    );

    return {
      labels: ["Fully vaccinated", "Partially vaccinated", "Non vaccinated"],
      datasets: [
        {
          data: [vaccinated, partially_vaccinated, non_vaccinated],
          backgroundColor: [
            COLORS.VACCINATED,
            COLORS.PARTIALLY_VACCINATED,
            COLORS.NON_VACCINATED,
          ],
        },
      ],
    };
  };

  return <Pie data={getData(data)} />;
};

const BarPlot = ({ label, data, color }) => {
  const getData = (data) => {
    return {
      labels: label,
      datasets: [
        {
          backgroundColor: color,
          data: data,
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
  return <Bar data={getData(data)} options={options} />;
};

const LineChart = ({ data, labels, borderColor, backgroundColor }) => (
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
);

const SummaryTableCountry = ({ data }) => {
  const classes = styles.useStyles();

  const columns = [
    { field: "id", hide: true },
    {
      field: "country",
      headerName: "Country",
      minWidth: 150,
      flex: 1,
      cellClassName: "country--cell",
      renderCell: (params) => (
        <Link to={`${ROUTES.HOME_BASE}/${params.value}`}>
          <Button style={{ color: "white" }}>{params.value}</Button>
        </Link>
      ),
      sortComparator: (v1, v2, row1, row2) => {
        return row1.value.localeCompare(row2.value);
      },
    },
    {
      field: "confirmed",
      headerName: "Cases",
      minWidth: 130,
      flex: 1,
      cellClassName: "confirmed--cell",
    },
    {
      field: "deaths",
      headerName: "Deaths",
      minWidth: 130,
      flex: 1,
      value: data.deaths,
      cellClassName: "deaths--cell",
    },
    {
      headerName: "Vaccinations",
      field: "people_vaccinated",
      minWidth: 180,
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
    }));
  };
  return (
    <div style={{ height: 520, width: "100%" }}>
      <div style={{ display: "flex", height: "100%" }}>
        <div style={{ flexGrow: 1 }} className={classes.root}>
          <DataGrid rows={getRows(data)} columns={columns} />
        </div>
      </div>
    </div>
  );
};

export function BarChartMovingAverage({ data, labels, barColor, lineColor }) {
  /**
   * returns an array with moving average of the input array
   * @param array - the input array
   * @param count - the number of elements to include in the moving average calculation
   *  value to determine whether it should be used
   */
  function movingAvg(array, count) {
    var avg = function (array) {
      var sum = 0,
        count = 0,
        val;
      for (var i in array) {
        val = array[i];
        sum += val;
        count++;
      }

      return sum / count;
    };

    let result = [];

    // pad beginning of result with null values
    for (let i = 0; i < count - 1; i++) {
      let val = avg(array.slice(0, i + 1));
      if (isNaN(val)) result.push(null);
      else result.push(parseInt(val));
    }
    // calculate average for each subarray and add to result
    for (let i = 0, len = array.length - count; i <= len; i++) {
      let val = avg(array.slice(i, i + count));
      if (isNaN(val)) result.push(null);
      else result.push(parseInt(val));
    }

    return result;
  }

  const getData = (data, labels) => {
    let moving_average = movingAvg(data, 7);

    return {
      labels: labels,
      datasets: [
        {
          type: "line",
          label: "7 days moving average",
          borderColor: lineColor,
          backgroundColor: lineColor,
          borderWidth: 1,
          fill: false,
          data: moving_average,
        },
        {
          type: "bar",
          label: "Daily",
          backgroundColor: barColor,
          data: data,
        },
      ],
    };
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            suggestedMin: 0,
          },
        },
      ],
    },
  };

  return <Bar data={getData(data, labels)} options={options} />;
}

const WithChartWrapper = (Component) => {
  const WithChartWrapper = ({ loading, title, children, data, ...props }) => {
    return (
      <>
        <Title title={title} />
        {(loading || data == null) && <LinearProgress />}
        {!loading && data != null && <Component data={data} {...props} />}
      </>
    );
  };

  return WithChartWrapper;
};

const WithDataSelector = (Component) => {
  const WithDataSelector = ({
    loading,
    title,
    children,
    data,
    labels,
    ...props
  }) => {
    const [span, setSpan] = React.useState(60);

    const handleChange = (event) => {
      setSpan(event.target.value);
    };

    return (
      <>
        <Grid container direction="row" alignItems="center" spacing={1}>
          <Grid item xs={7}>
            <Title title={title} />
          </Grid>
          <Grid item xs={5}>
            <FormControl fullWidth>
              <InputLabel id={"select-time-span-" + title + "-label"}>
                Time span
              </InputLabel>
              <Select
                labelId={"select-time-span-" + title + "-label"}
                id={"select-time-span-" + title}
                value={span}
                label="Time span"
                onChange={handleChange}
              >
                <MenuItem value={14}>2 Weeks</MenuItem>
                <MenuItem value={30}>30 Days</MenuItem>
                <MenuItem value={60}>3 months</MenuItem>
                <MenuItem value={120}>6 months</MenuItem>
                {data != null && <MenuItem value={data.length}>All</MenuItem>}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        {(loading || data == null) && <LinearProgress />}
        {!loading && data != null && (
          <Component
            data={data.slice(-span)}
            labels={labels.slice(-span)}
            {...props}
          />
        )}
      </>
    );
  };

  return WithDataSelector;
};

const Title = ({ title }) => (
  <Typography p={1} m={1} variant="h5" style={{ background: "Beige" }}>
    <Box p={1} m={1} fontWeight="fontWeightBold">
      {title}
    </Box>
  </Typography>
);

export const SummaryTableWrapper = WithChartWrapper(SummaryTable);
export const SummaryPieWrapper = WithChartWrapper(SummaryPie);
export const BarPlotWrapper = WithChartWrapper(BarPlot);
export const LineChartWrapper = WithChartWrapper(LineChart);
export const SummaryTableCountryWrapper = WithChartWrapper(SummaryTableCountry);
export const BarChartMovingAverageWrapper = WithDataSelector(
  BarChartMovingAverage
);
