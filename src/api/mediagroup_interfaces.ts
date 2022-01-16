export interface Country {
  country?: string 
  population: number
  sq_km_area?: number
  life_expectancy?: string
  elevation_in_meters?: number
  continent?: string
  abbreviation?: string
  location?: string
  iso?: number
  capital_city?: string
}


export interface Cases extends Country {
  confirmed: number
  recovered: number
  deaths: number
  lat?: string
  long?: string
  updated: string
}


export interface History extends Country {
  dates: any
}

export interface Vaccination extends Country {
  administered: number
  people_vaccinated: number
  people_partially_vaccinated: number
  updated: string
}
