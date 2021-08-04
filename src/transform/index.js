const moment = require("moment");

export const transformCountryData = (data) => {
  let totalDeaths = data.map((item) => item.Deaths);
  let totalRecovered = data.map((item) => item.Recovered);
  let totalConfirmed = data.map((item) => item.Confirmed);
  let newDeaths = new Array(data.length);
  let newRecovered = new Array(data.length);
  let newConfirmed = new Array(data.length);
  newDeaths[0] = newConfirmed[0] = newRecovered[0] = 0;

  for (let i = 0; i < data.length - 1; i++) {
    newDeaths[i + 1] = totalDeaths[i + 1] - totalDeaths[i];
    newConfirmed[i + 1] = totalConfirmed[i + 1] - totalConfirmed[i];
    newRecovered[i + 1] = totalRecovered[i + 1] - totalRecovered[i];
  }

  let labels = data.map((item) => moment(item.Date).format("MM-DD"));

  return {
    labels: labels,
    totalDeaths: totalDeaths,
    newDeaths: newDeaths,
    totalRecoveries: totalRecovered,
    newRecoveries: newRecovered,
    totalConfirmed: totalConfirmed,
    newConfirmed: newConfirmed,
  };
};
/*
// For corona.lmao.ninja API
export const transformGlobalData = (data) => {
  let computeDailyData = (currentValue, index, array) => {
    if (index == 0) {
      return 0;
    }
    return currentValue - array[index - 1];
  };

  let labels = Object.keys(data["cases"]);
  let totalConfirmed = Object.values(data["cases"]);
  let totalRecovered = Object.values(data["recovered"]);
  let totalDeaths = Object.values(data["deaths"]);
  let newConfirmed = totalConfirmed.map(computeDailyData);
  let newRecovered = totalRecovered.map(computeDailyData);
  let newDeaths = totalDeaths.map(computeDailyData);

  let processedData = {
    labels: labels,
    totalConfirmed: totalConfirmed,
    newConfirmed: newConfirmed,
    totalRecoveries: totalRecovered,
    newRecoveries: newRecovered,
    totalDeaths: totalDeaths,
    newDeaths: newDeaths,
  };
  return processedData;
};
*/
// for api.covid19api
export const transformGlobalData = (data) => {
  let start = moment("2020-04-12");
  let sorting = function (a, b) {
    return a[0] - b[0];
  };

  data.sort((a, b) => a.TotalConfirmed - b.TotalConfirmed);
  let deaths = data
    .map((item) => [item.TotalDeaths, item.NewDeaths])
    .sort(sorting);
  let totalDeaths = deaths.map((item) => item[0]);
  let newDeaths = deaths.map((item) => item[1]);
  let recovered = data
    .map((item) => [item.TotalRecovered, item.NewRecovered])
    .sort(sorting);
  let totalRecovered = recovered.map((item) => item[0]);
  let newRecovered = recovered.map((item) => item[1]);
  let confirmed = data
    .map((item) => [item.TotalConfirmed, item.NewConfirmed])
    .sort(sorting);
  let totalConfirmed = confirmed.map((item) => item[0]);
  let newConfirmed = confirmed.map((item) => item[1]);
  let labels = data.map((item) => start.add(1, "days").format("MM-DD"));

  return {
    labels: labels,
    totalConfirmed: totalConfirmed,
    newConfirmed: newConfirmed,
    totalRecoveries: totalRecovered,
    newRecoveries: newRecovered,
    totalDeaths: totalDeaths,
    newDeaths: newDeaths,
  };
};
