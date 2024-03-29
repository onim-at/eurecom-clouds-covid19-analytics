const moment = require("moment");

export const combineSummaryVaccines = (summary_dict, vaccines_dict) => {
  let out = {};

  for (const country in summary_dict) {
    let summary = summary_dict[country].All;

    if (vaccines_dict[country]) {
      let vaccines = vaccines_dict[country].All;

      out[country] = {
        population: summary.population,
        confirmed: summary.confirmed,
        deaths: summary.deaths,
        administered: vaccines.administered,
        people_vaccinated: vaccines.people_vaccinated,
        people_partially_vaccinated: vaccines.people_partially_vaccinated,
      };
    }
  }
  return out;
};

export const transformHistory = (data) => {
  data = data.All.dates;
  let dates = Object.keys(data);
  dates.sort((a, b) => a.localeCompare(b));

  let firstDay = data[dates[0]];
  let out = {
    labels: [dates[0]],
    totalDeath: [firstDay.death],
    totalConfirmed: [firstDay.confirmed],
    dailyDeath: [firstDay.death],
    dailyConfirmed: [firstDay.confirmed],
  };

  for (let i = 1; i < dates.length; i++) {
    let cur = dates[i];
    let prev = dates[i - 1];
    out.labels.push(cur);
    out.totalDeath.push(data[cur].death);
    out.totalConfirmed.push(data[cur].confirmed);
    let dailyDeath = data[cur].death - data[prev].death
    if (dailyDeath < 0) dailyDeath = 0
    out.dailyDeath.push(dailyDeath);
    let dailyConfirmed = data[cur].confirmed - data[prev].confirmed
    if (dailyConfirmed < 0) dailyConfirmed = 0
    out.dailyConfirmed.push(dailyConfirmed);
  }

  return out;
};

export const transformCountryData = (data) => {
  let totalDeaths = data.map((item) => item.Deaths);
  let totalConfirmed = data.map((item) => item.Confirmed);
  let newDeaths = new Array(data.length);
  let newConfirmed = new Array(data.length);
  newDeaths[0] = newConfirmed[0] = 0;

  for (let i = 0; i < data.length - 1; i++) {
    newDeaths[i + 1] = totalDeaths[i + 1] - totalDeaths[i];
    newConfirmed[i + 1] = totalConfirmed[i + 1] - totalConfirmed[i];
  }

  let labels = data.map((item) => moment(item.Date).format("MM-DD"));

  return {
    labels: labels,
    totalDeaths: totalDeaths,
    newDeaths: newDeaths,
    totalConfirmed: totalConfirmed,
    newConfirmed: newConfirmed,
  };
};

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
    totalDeaths: totalDeaths,
    newDeaths: newDeaths,
  };
};
