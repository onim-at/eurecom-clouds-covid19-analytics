import React from "react";
import { Route } from "react-router-dom";
import Grid from "@material-ui/core/Grid";

import * as TITLES from "../../constants/titles";
import * as ROUTES from "../../constants/routes";
import * as COLORS from "../../constants/colors";
import {
  SummaryTable,
  SummaryPie,
  LineChartTotal,
  SummaryTableCountry,
  BarPlotWeek,
} from "../Analytics";

const Statistics = ({ country, summary, history, loading }) => {
  return (
    <Grid container justifyContent="center" spacing={6}>
      <Grid item xs={11}>
        <SummaryTable
          data={summary[country]}
          loading={loading}
          title={TITLES.SUMMARY + country}
        />
      </Grid>

      <Grid item xs={11}>
        <BarPlotWeek
          data={history.confirmed}
          label={history.labels}
          loading={loading}
          color={COLORS.CONFIRMED}
          title={TITLES.DAILY_WEEK_CONFIRMED + country}
        />
      </Grid>

      <Grid item xs={11}>
        <BarPlotWeek
          data={history.death}
          label={history.labels}
          loading={loading}
          color={COLORS.DEATHS}
          title={TITLES.DAILY_WEEK_DEATHS + country}
        />
      </Grid>

      <Grid item xs={11}>
        <LineChartTotal
          data={history.confirmed}
          labels={history.labels}
          title={TITLES.DAILY_TOTAL + country}
          loading={loading}
          backgroundColor={COLORS.CONFIRMED_BG}
          borderColor={COLORS.CONFIRMED}
        />
      </Grid>

      <Grid item xs={11}>
        <LineChartTotal
          data={history.death}
          labels={history.labels}
          title={TITLES.DAILY_TOTAL + country}
          loading={loading}
          backgroundColor={COLORS.DEATHS_BG}
          borderColor={COLORS.DEATHS}
        />
      </Grid>

      <Route path={ROUTES.HOME_REDIRECT}>
        <Grid item xs={11}>
          <SummaryTableCountry
            data={summary}
            title={TITLES.COUNTRY}
            loading={loading}
          />
        </Grid>
      </Route>
    </Grid>
  );
};

export default Statistics;
