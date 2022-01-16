import {Cases, History, Vaccination} from "./mediagroup_interfaces"

const moment = require('moment')
const baseURL = "https://covid-api.mmediagroup.fr/v1";



/**
 * [someFunction description]
 * @return Dictionary for each country with {confirmed: int, recovered (deprecated): int, deaths: int}
 *  */
export async function getSummary(country: string): Promise<Cases>{
  let url = `/cases?country=${country}`;

  const response = await fetch(baseURL + url);
  const data = await response.json();

  if (response.ok) {
    return data;
  } else {
    let err = { status: response.status, message: data.message };
    throw err;
  }
}

export async function getHistory(country: string, status: string): Promise<History> {
  let url = `/history?country=${country}$status=${status}`;
  const response = await fetch(baseURL + url);
  const data = await response.json();

  if (response.ok) {
    return data;
  } else {
    let err = { status: response.status, message: data.message };
    throw err;
  }
}

export async function getVaccination(country: string): Promise<Vaccination>{
  let url = `/vaccination?country=${country}`;

  const response = await fetch(baseURL + url);
  const data = await response.json();

  if (response.ok) {
    return data;
  } else {
    let err = { status: response.status, message: data.message };
    throw err;
  }
}
