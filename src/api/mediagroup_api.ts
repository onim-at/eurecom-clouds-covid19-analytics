import {SummaryResponse, HistoryResponse, VaccinesResponse} from "./mediagroup_interfaces"

const baseURL = "https://covid-api.mmediagroup.fr/v1";


/**
 * [someFunction description]
 * @return Dictionary for each country with {confirmed: int, recovered (deprecated): int, deaths: int}
 *  */
export async function getSummary(): Promise<SummaryResponse>{
  let url = `/cases`;

  const response = await fetch(baseURL + url);
  const data = await response.json();

  if (response.ok) {
    return data;
  } else {
    let err = { status: response.status, message: data.message };
    throw err;
  }
}

export async function getHistory(country: string, status: string): Promise<HistoryResponse> {
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

export async function getVaccines(): Promise<VaccinesResponse>{
  let url = `/vaccines`;

  const response = await fetch(baseURL + url);
  const data = await response.json();

  if (response.ok) {
    return data;
  } else {
    let err = { status: response.status, message: data.message };
    throw err;
  }
}
