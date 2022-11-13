import { ValidationPipe } from "@nestjs/common/pipes";
import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";
import { QueryFailedFilter } from "./common/filters/query-failed.filter";
import { HttpExceptionFilter } from "./common/filters/bad-request.filter";
import { UtilsRouteList } from "./utils/services/route.list";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const reflector = app.get(Reflector);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalFilters(
    new HttpExceptionFilter(reflector),
    new QueryFailedFilter(reflector)
  );
  app.enableCors();
  await app.listen(8000);

  // For dev purposes to see routes
  UtilsRouteList.getRouteList(app.getHttpServer()._events.request._router);
}

bootstrap();
