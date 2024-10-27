"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const config_1 = require("@nestjs/config");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const http_exception_filter_1 = require("./common/filters/http-exception.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        rawBody: true,
    });
    const configService = app.get(config_1.ConfigService);
    const PORT = configService.get("PORT") || 3001;
    const NODE_ENV = configService.get("NODE_ENV") || "development";
    app.enableCors(configService.get("corsOptions"));
    app.use((0, cookie_parser_1.default)());
    app.useGlobalPipes(new common_1.ValidationPipe({ transform: true }));
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
    app.setGlobalPrefix("api");
    if (NODE_ENV !== "production") {
        const config = new swagger_1.DocumentBuilder()
            .setTitle("Develop Today API")
            .setDescription("API description")
            .setVersion("1.0")
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, config);
        swagger_1.SwaggerModule.setup("api", app, document);
    }
    await app.listen(PORT, () => {
        common_1.Logger.log(`Server is starting on port ${PORT}`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map