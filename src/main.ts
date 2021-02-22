import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './exception-filters/validation';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AuthGuard } from './guards/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({
    forbidUnknownValues: true,
    transform:true
  }));
  const reflector = app.get( Reflector );
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalGuards(new AuthGuard(reflector));
  app.disable('X-Powered-By');
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
