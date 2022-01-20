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

const Statistics = ({ country, summary, history, summaryLoading, historyLoading }) => {
  return (
    <Grid container justifyContent="center" spacing={6}>
      <Grid item xs={11}>
        <SummaryTable
          data={summary[country]}
          loading={summaryLoading}
          title={TITLES.SUMMARY}
        />
      </Grid>

      <Grid item xs={11}>
        <SummaryPie
          data={summary[country]}
          loading={summaryLoading}
          title={TITLES.VACCINATION}
        />
      </Grid>

      <Grid item xs={11}>
        <BarPlotWeek
          data={history.dailyConfirmed}
          label={history.labels}
          loading={historyLoading}
          color={COLORS.CONFIRMED}
          title={TITLES.DAILY_CONFIRMED}
        />
      </Grid>

      <Grid item xs={11}>
        <BarPlotWeek
          data={history.dailyDeath}
          label={history.labels}
          loading={historyLoading}
          color={COLORS.DEATHS}
          title={TITLES.DAILY_DEATHS}
        />
      </Grid>

      <Grid item xs={11}>
        <LineChartTotal
          data={history.totalConfirmed}
          labels={history.labels}
          title={TITLES.TOTAL_CONFIRMED}
          loading={historyLoading}
          backgroundColor={COLORS.CONFIRMED_BG}
          borderColor={COLORS.CONFIRMED}
        />
      </Grid>

      <Grid item xs={11}>
        <LineChartTotal
          data={history.totalDeath}
          labels={history.labels}
          title={TITLES.TOTAL_DEATHS}
          loading={historyLoading}
          backgroundColor={COLORS.DEATHS_BG}
          borderColor={COLORS.DEATHS}
        />
      </Grid>

      <Route path={ROUTES.HOME_REDIRECT}>
        <Grid item xs={11}>
          <SummaryTableCountry
            data={summary}
            title={TITLES.COUNTRY}
            loading={summaryLoading}
          />
        </Grid>
      </Route>
    </Grid>
  );
};

export default Statistics;
