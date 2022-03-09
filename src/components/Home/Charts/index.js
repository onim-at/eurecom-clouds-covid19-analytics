import React from "react";

import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import SummaryTable, { SummaryTableLoader } from "./SummaryTable";
import SummaryPie, { SummaryPieLoader } from "./SummaryPie";
import SummaryTableCountry, {
  SummaryTableCountryLoader,
} from "./SummaryTableCountry";
import BarChartMovingAverage, { BarChartLoader } from "./BarChartMovingAverage";

const WithChartWrapper = (Component, Loader) => {
  if (!Loader) {
    Loader = LinearProgress;
  }

  const WithChartWrapper = ({ loading, title, children, data, ...props }) => {
    return (
      <>
        <Title title={title} />
        {(loading || data == null) && <Loader />}
        {!loading && data != null && <Component data={data} {...props} />}
      </>
    );
  };

  return WithChartWrapper;
};

const WithDataSelector = (Component, Loader) => {
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

    if (!Loader) {
      Loader = LinearProgress;
    }

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
        {(loading || data == null) && <Loader />}
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

export const SummaryTableWrapper = WithChartWrapper(
  SummaryTable,
  SummaryTableLoader
);
export const SummaryPieWrapper = WithChartWrapper(SummaryPie, SummaryPieLoader);
export const SummaryTableCountryWrapper = WithChartWrapper(
  SummaryTableCountry,
  SummaryTableCountryLoader
);
export const BarChartMovingAverageWrapper = WithDataSelector(
  BarChartMovingAverage,
  BarChartLoader
);
