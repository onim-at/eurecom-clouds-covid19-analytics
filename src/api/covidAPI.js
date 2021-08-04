const baseURL = "https://api.covid19api.com";

export async function getSummary() {
  let url = "/summary";

  const response = await fetch(baseURL + url);
  const data = await response.json();

  if (response.ok) {
    return { ...data.Global, Countries: data.Countries };
  } else {
    let err = { status: response.status, message: data.message };
    throw err;
  }
}

export async function getCountries() {
  let url = "/countries";
  const response = await fetch(baseURL + url);
  const data = await response.json();

  if (response.ok) {
    return data;
  } else {
    let err = { status: response.status, message: data.message };
    throw err;
  }
}

export async function getLiveByCountry(country) {
  let url = "/live/country/" + country;

  const response = await fetch(baseURL + url);
  const data = await response.json();

  if (response.ok) {
    return data;
  } else {
    let err = { status: response.status, message: data.message };
    throw err;
  }
}
/*
export async function getTotalGlobal() {
  let start = "2020-04-13T00:00:00Z";
  let end = moment().format("YYYY-MM-DDThh:mm:ssZ");
  let url = "/world?from=" + start + "&to=" + end;

  const response = await fetch(baseURL + url);
  const data = await response.json();

  if (response.ok) {
    return data;
  } else {
    let err = { status: response.status, message: data.message };
    throw err;
  }
}
*/

export async function getTotalGlobal() {
  let url = "https://corona.lmao.ninja/v2/historical/all";
  const response = await fetch(url);
  const data = await response.json();

  if (response.ok) {
    return data;
  } else {
    let err = { status: response.status, message: data.message };
    throw err;
  }
}

export async function getTotalByCountry(country) {
  let url = "/total/country/" + country;

  const response = await fetch(baseURL + url);
  const data = await response.json();

  if (response.ok) {
    return data;
  } else {
    let err = { status: response.status, message: data.message };
    throw err;
  }
}
