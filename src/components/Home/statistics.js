import React from "react";
import { Route } from "react-router-dom";
import Grid from "@material-ui/core/Grid";

import * as TITLES from "../../constants/titles";
import * as ROUTES from "../../constants/routes";
import {
  SummaryTable,
  SummaryPie,
  LineChartTotal,
  SummaryTableCountry,
  BarPlotWeek,
} from "../Analytics";

const Statistics = ({ summary, total, loading, titleName }) => {
  return (
    <Grid container justify="center" spacing={6}>
      <Grid item xs={10}>
        <SummaryTable
          data={summary}
          loading={loading}
          title={TITLES.SUMMARY + titleName}
        />
      </Grid>
      <Grid item xs={10}>
        <SummaryPie
          data={summary}
          loading={loading}
          title={TITLES.DISTRIBUTION + titleName}
        />
      </Grid>
      <Grid item xs={10}>
        <BarPlotWeek
          data={total}
          loading={loading}
          title={TITLES.DAILY_WEEK + titleName}
        />
      </Grid>
      <Grid item xs={10}>
        <LineChartTotal
          data={total}
          title={TITLES.DAILY_TOTAL + titleName}
          loading={loading}
        />
      </Grid>
      <Route path={ROUTES.HOME}>
        <Grid item xs={10}>
          <SummaryTableCountry
            data={summary.Countries}
            title={TITLES.COUNTRY}
            loading={loading}
          />
        </Grid>
      </Route>
    </Grid>
  );
};

export default Statistics;
