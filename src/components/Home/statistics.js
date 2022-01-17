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
      {/* 
      <Grid item xs={11}>
        <SummaryPie
          data={summary}
          loading={loading}
          title={TITLES.DISTRIBUTION + country}
        />
      </Grid>
      <Grid item xs={11}>
        <BarPlotWeek
          data={history}
          loading={loading}
          title={TITLES.DAILY_WEEK + country}
        />
      </Grid>
      <Grid item xs={11}>
        <LineChartTotal
          data={history}
          title={TITLES.DAILY_TOTAL + country}
          loading={loading}
        />
      </Grid>
      <Route path={ROUTES.HOME}>
        <Grid item xs={11}>
          <SummaryTableCountry
            data={summary}
            title={TITLES.COUNTRY}
            loading={loading}
          />
        </Grid>
        
      </Route>
      */}
    </Grid>
  );
};

export default Statistics;
