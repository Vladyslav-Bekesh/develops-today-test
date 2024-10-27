import { Controller, Get, HttpStatus, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ServerResponse } from "@/common/types/server-responce";
import { ICountryInfo } from "@/common/types/countryInfo";
import { IAvailableCountries } from "@/common/types/availableCountries";
import { CountryService } from "@/modules/country/country.service";

@ApiTags("country")
@Controller("country")
export class CountryController {
  public constructor(private readonly countryService: CountryService) {}

  @Get("/country-info/:countryCode")
  public async getCountryInfo(
    @Param("countryCode") countryCode: string,
  ): Promise<ServerResponse<ICountryInfo>> {
    const countryInfo = await this.countryService.getCountryInfo(countryCode);
    return {
      message: "Country info was successfully found",
      data: countryInfo,
      status: HttpStatus.OK,
    };
  }

  @Get("/available-countries")
  public async getAvailableCountries(): Promise<
    ServerResponse<IAvailableCountries>
  > {
    const availableCountries =
      await this.countryService.getAvailableCountries();
    return {
      message: "Available countries were successfully found",
      data: availableCountries,
      status: HttpStatus.OK,
    };
  }
}
