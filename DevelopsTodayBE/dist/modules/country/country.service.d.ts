import { ICountryInfo } from "@/common/types/countryInfo";
import { IAvailableCountries } from "@/common/types/availableCountries";
export declare class CountryService {
    constructor();
    getCountryInfo(countryCode: string): Promise<ICountryInfo>;
    getAvailableCountries(): Promise<IAvailableCountries>;
}
