"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountryService = void 0;
const common_1 = require("@nestjs/common");
let CountryService = class CountryService {
    constructor() { }
    async getCountryInfo(countryCode) {
        const availableCountries = (await this.getAvailableCountries());
        const country = availableCountries.find((country) => country.countryCode.toLowerCase() === countryCode.toLowerCase());
        if (!country) {
            throw new common_1.NotFoundException("Country not found in available countries");
        }
        const countryNager = await fetch(`${process.env.NAGER_API_URL}/CountryInfo/${countryCode}`);
        const nagerResponce = (await countryNager.json());
        if (!nagerResponce) {
            throw new common_1.NotFoundException("Country not found");
        }
        const countryNowPopulation = await fetch(`${process.env.COUNTRIES_NOW_API_URL}/countries/population`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ country: country.name }),
        });
        const countriesNowResponce = (await countryNowPopulation.json());
        if (countriesNowResponce.error) {
            throw new common_1.NotFoundException("Country not found");
        }
        const countryNowFlag = await fetch(`${process.env.COUNTRIES_NOW_API_URL}/countries/flag/images`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ country: country.name }),
        });
        const countryNowFlagJson = (await countryNowFlag.json());
        if (countryNowFlagJson.error) {
            throw new common_1.NotFoundException("Flag not found");
        }
        if (!nagerResponce ||
            countriesNowResponce.error ||
            !countriesNowResponce.data) {
            throw new common_1.NotFoundException("Country not found");
        }
        return {
            name: country.name,
            borders: nagerResponce.borders,
            population: countriesNowResponce.data.populationCounts,
            flag: countryNowFlagJson.data.flag,
        };
    }
    async getAvailableCountries() {
        const response = await fetch(`${process.env.NAGER_API_URL}/AvailableCountries`);
        const data = await response.json();
        if (!data) {
            throw new common_1.NotFoundException("Available countries not found");
        }
        return data;
    }
};
exports.CountryService = CountryService;
exports.CountryService = CountryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], CountryService);
//# sourceMappingURL=country.service.js.map