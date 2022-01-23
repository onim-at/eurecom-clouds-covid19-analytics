import React from "react";
import { Route } from "react-router-dom";
import Grid from "@material-ui/core/Grid";

import * as TITLES from "../../constants/titles";
import * as ROUTES from "../../constants/routes";
import * as COLORS from "../../constants/colors";
import {
  SummaryTableWrapper,
  SummaryPieWrapper,
  SummaryTableCountryWrapper,
  BarChartMovingAverageWrapper,
} from "../Charts";

const Statistics = ({
  country,
  summary,
  history,
  summaryLoading,
  historyLoading,
}) => {
  return (
    <Grid container justifyContent="center" spacing={6}>
      <Grid item xs={11} md={5}>
        <SummaryTableWrapper
          data={summary[country]}
          loading={summaryLoading}
          title={TITLES.SUMMARY}
        />
      </Grid>

      <Grid item xs={11} md={5}>
        <SummaryPieWrapper
          data={summary[country]}
          loading={summaryLoading}
          title={TITLES.VACCINATION}
        />
      </Grid>
      {/*
      <Grid item xs={11}>
        <BarPlotWrapper
          data={history.dailyConfirmed}
          label={history.labels}
          loading={historyLoading}
          color={COLORS.CONFIRMED}
          title={TITLES.DAILY_CONFIRMED}
        />
      </Grid>

      <Grid item xs={11}>
        <BarPlotWrapper
          data={history.dailyDeath}
          label={history.labels}
          loading={historyLoading}
          color={COLORS.DEATHS}
          title={TITLES.DAILY_DEATHS}
        />
      </Grid>

      <Grid item xs={11}>
        <LineChartWrapper
          data={history.totalConfirmed}
          labels={history.labels}
          title={TITLES.TOTAL_CONFIRMED}
          loading={historyLoading}
          backgroundColor={COLORS.CONFIRMED_BG}
          borderColor={COLORS.CONFIRMED}
        />
      </Grid>

      <Grid item xs={11}>
        <LineChartWrapper
          data={history.totalDeath}
          labels={history.labels}
          title={TITLES.TOTAL_DEATHS}
          loading={historyLoading}
          backgroundColor={COLORS.DEATHS_BG}
          borderColor={COLORS.DEATHS}
        />
      </Grid>
      */}
      <Grid item xs={11}>
        <BarChartMovingAverageWrapper
          data={history.dailyConfirmed}
          labels={history.labels}
          title={TITLES.DAILY_CONFIRMED}
          loading={historyLoading}
          lineColor={COLORS.CONFIRMED_LINE}
          barColor={COLORS.CONFIRMED_BAR}
        />
      </Grid>
      <Grid item xs={11}>
        <BarChartMovingAverageWrapper
          data={history.dailyConfirmed}
          labels={history.labels}
          title={TITLES.DAILY_DEATHS}
          loading={historyLoading}
          lineColor={COLORS.DEATH_LINE}
          barColor={COLORS.DEATH_BAR}
        />
      </Grid>
      <Route path={ROUTES.HOME_REDIRECT}>
        <Grid item xs={11}>
          <SummaryTableCountryWrapper
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
