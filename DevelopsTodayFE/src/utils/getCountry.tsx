import { ICountryInfo } from "../types/countries";

export const getCountry = async (
  countryCode: string
): Promise<ICountryInfo> => {
  const response = await fetch(
    `http://localhost:3001/country/country-info/${countryCode}`
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data.data;
};

export const getCountries = async () => {
  const response = await fetch(`http://localhost:3001/country/countries`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data.data;
};
