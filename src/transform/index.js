const moment = require("moment");

export const combineSummaryVaccines = (summary_dict, vaccines_dict) => {

  let out = {}

  for (const country in summary_dict) {
    let summary = summary_dict[country].All

    if (vaccines_dict[country]){
      let vaccines = vaccines_dict[country].All

      out[country] = {
        population: summary.population,
        confirmed: summary.confirmed,
        deaths: summary.deaths,
        administered: vaccines.administered,
        people_vaccinated: vaccines.people_vaccinated, 
        people_partially_vaccinated: vaccines.people_partially_vaccinated, 
      }
    }
    
  }
  return out    
} 



export const transformHistory = (data) => {

}


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
  