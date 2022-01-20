
export interface Country {
  country?: string;
  population: number;
  sq_km_area?: number;
  life_expectancy?: string;
  elevation_in_meters?: number;
  continent?: string;
  abbreviation?: string;
  location?: string;
  iso?: number;
  capital_city?: string;
}

export interface Summary extends Country {
  confirmed: number;
  recovered: number;
  deaths: number;
  lat?: string;
  long?: string;
  updated: string;
}

interface HistoryDictionary {
  [key: string]: number | HistoryDictionary;
}

export interface History extends Country {
  dates: HistoryDictionary;
}

export interface Vaccines extends Country {
  administered: number;
  people_vaccinated: number;
  people_partially_vaccinated: number;
  updated: string;
}

interface SummaryContainer {
  All: Summary;
}

export interface SummaryResponse {
  [key: string]: SummaryContainer;
}

export interface HistoryResponse {
  All: History;
}

interface VaccinesContainer {
  All: Vaccines;
}

export interface VaccinesResponse {
  [key: string]: VaccinesContainer;
}
