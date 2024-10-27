import { Module } from "@nestjs/common";
import { CountryService } from "@/modules/country/country.service";
import { CountryController } from "@/modules/country/country.controller";

@Module({
  imports: [],

  providers: [CountryService],
  controllers: [CountryController],
  exports: [CountryService],
})
export class CountryModule {}
