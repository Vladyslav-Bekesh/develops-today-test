import { ServerResponse } from "@/common/types/server-responce";
import { ICountryInfo } from "@/common/types/countryInfo";
import { IAvailableCountries } from "@/common/types/availableCountries";
import { CountryService } from "@/modules/country/country.service";
export declare class CountryController {
    private readonly countryService;
    constructor(countryService: CountryService);
    getCountryInfo(countryCode: string): Promise<ServerResponse<ICountryInfo>>;
    getAvailableCountries(): Promise<ServerResponse<IAvailableCountries>>;
}
