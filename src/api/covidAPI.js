const baseURL = "https://api.covid19api.com";

export async function getSummary() {
  let url = "/summary";

  const response = await fetch(baseURL + url);
  const data = await response.json();

  if (response.ok) {
    return data;
  } else {
    let err = { status: response.status, errObj: data };
    throw err;
  }
}

export async function getLiveByCountry(country) {
  let url = "/total/country/" + country;

  const response = await fetch(baseURL + url);
  const data = await response.json();

  if (response.ok) {
    return data;
  } else {
    let err = { status: response.status, errObj: data };
    throw err;
  }
}
