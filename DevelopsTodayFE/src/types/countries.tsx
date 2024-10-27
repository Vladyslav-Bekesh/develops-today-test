export interface ICountryInfo {
  name: string;
  borders: IBorder[];
  population: ICountriesNowPopulationCount[];
  flag: string;
}

//! Nager API responce
export interface IBorder {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
}

export interface INagerResponce {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders: IBorder[];
}

//! Countries Now API responce
export interface ICountriesNowResponce {
  error: boolean;
  msg: string;
  data: ICountriesNowData;
}

export interface ICountryFlagResponse {
  error: boolean;
  msg: string;
  data: ICountryFlagData;
}

export interface ICountryFlagData {
  name: string;
  flag: string;
  iso2: string;
  iso3: string;
}

export interface ICountriesNowData {
  country: string;
  code: string;
  iso3: string;
  populationCounts: ICountriesNowPopulationCount[];
}

export interface ICountriesNowPopulationCount {
  year: number;
  value: number;
}
