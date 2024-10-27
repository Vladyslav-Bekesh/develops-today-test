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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountryController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const country_service_1 = require("./country.service");
let CountryController = class CountryController {
    constructor(countryService) {
        this.countryService = countryService;
    }
    async getCountryInfo(countryCode) {
        const countryInfo = await this.countryService.getCountryInfo(countryCode);
        return {
            message: "Country info was successfully found",
            data: countryInfo,
            status: common_1.HttpStatus.OK,
        };
    }
    async getAvailableCountries() {
        const availableCountries = await this.countryService.getAvailableCountries();
        return {
            message: "Available countries were successfully found",
            data: availableCountries,
            status: common_1.HttpStatus.OK,
        };
    }
};
exports.CountryController = CountryController;
__decorate([
    (0, common_1.Get)("/country-info/:countryCode"),
    __param(0, (0, common_1.Param)("countryCode")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CountryController.prototype, "getCountryInfo", null);
__decorate([
    (0, common_1.Get)("/available-countries"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CountryController.prototype, "getAvailableCountries", null);
exports.CountryController = CountryController = __decorate([
    (0, swagger_1.ApiTags)("country"),
    (0, common_1.Controller)("country"),
    __metadata("design:paramtypes", [country_service_1.CountryService])
], CountryController);
//# sourceMappingURL=country.controller.js.map