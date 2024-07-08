import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import { MyConfigType } from './common/config/myconfig.type';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService<MyConfigType> = app.get(ConfigService);
  
  app.use(cookieParser());
  await app.listen(3000);
}
bootstrap();
