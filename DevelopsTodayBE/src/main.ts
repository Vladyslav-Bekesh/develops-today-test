import { NestFactory } from "@nestjs/core";
import { AppModule } from "@/app.module";
import { INestApplication, Logger, ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ConfigService } from "@nestjs/config";
import cookieParser from "cookie-parser";
import { HttpExceptionFilter } from "@/common/filters/http-exception.filter";

async function bootstrap() {
  const app = await NestFactory.create<INestApplication>(AppModule, {
    rawBody: true,
  });

  const configService = app.get(ConfigService);
  const PORT = configService.get("PORT") || 3001;
  const NODE_ENV = configService.get("NODE_ENV") || "development";

  app.enableCors(configService.get("corsOptions"));

  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.setGlobalPrefix("api");

  if (NODE_ENV !== "production") {
    const config = new DocumentBuilder()
      .setTitle("Develop Today API")
      .setDescription("API description")
      .setVersion("1.0")
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api", app, document);
  }

  await app.listen(PORT, () => {
    Logger.log(`Server is starting on port ${PORT}`);
  });
}

bootstrap();
