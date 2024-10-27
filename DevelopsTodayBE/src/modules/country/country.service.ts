import { Injectable, NotFoundException } from "@nestjs/common";
import {
  ICountriesNowResponce,
  ICountryFlagResponse,
  ICountryInfo,
  INagerResponce,
} from "@/common/types/countryInfo";
import { IAvailableCountries } from "@/common/types/availableCountries";

@Injectable()
export class CountryService {
  public constructor() {}

  public async getCountryInfo(countryCode: string): Promise<ICountryInfo> {
    //! Available Countries
    const availableCountries =
      (await this.getAvailableCountries()) as IAvailableCountries;
    const country = availableCountries.find(
      (country) =>
        country.countryCode.toLowerCase() === countryCode.toLowerCase(),
    );

    if (!country) {
      throw new NotFoundException("Country not found in available countries");
    }

    //! Nager API
    const countryNager = await fetch(
      `${process.env.NAGER_API_URL}/CountryInfo/${countryCode}`,
    );
    const nagerResponce = (await countryNager.json()) as INagerResponce;

    if (!nagerResponce) {
      throw new NotFoundException("Country not found");
    }

    //! Countries Now API
    // Population
    const countryNowPopulation = await fetch(
      `${process.env.COUNTRIES_NOW_API_URL}/countries/population`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ country: country.name }),
      },
    );

    const countriesNowResponce =
      (await countryNowPopulation.json()) as ICountriesNowResponce;

    if (countriesNowResponce.error) {
      throw new NotFoundException("Country not found");
    }

    //! Flag
    const countryNowFlag = await fetch(
      `${process.env.COUNTRIES_NOW_API_URL}/countries/flag/images`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ country: country.name }),
      },
    );

    const countryNowFlagJson =
      (await countryNowFlag.json()) as ICountryFlagResponse;

    if (countryNowFlagJson.error) {
      throw new NotFoundException("Flag not found");
    }

    //! results
    if (
      !nagerResponce ||
      countriesNowResponce.error ||
      !countriesNowResponce.data
    ) {
      throw new NotFoundException("Country not found");
    }

    return {
      name: country.name,
      borders: nagerResponce.borders,
      population: countriesNowResponce.data.populationCounts,
      flag: countryNowFlagJson.data.flag,
    };
  }

  public async getAvailableCountries(): Promise<IAvailableCountries> {
    const response = await fetch(
      `${process.env.NAGER_API_URL}/AvailableCountries`,
    );
    const data = await response.json();

    if (!data) {
      throw new NotFoundException("Available countries not found");
    }

    return data;
  }
}
