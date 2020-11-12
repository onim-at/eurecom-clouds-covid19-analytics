const baseURL = "https://api.covid19api.com";

export async function getSummary() {
  let url = "/summary";

  const response = await fetch(baseURL + url);
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
