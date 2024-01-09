import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './common/typeorm.config';
import { configValidationSchema } from './common/config.schema';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { BoardController } from './board/board.controller';
import { BoardService } from './board/board.service';
import { BoardModule } from './board/board.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      validationSchema: configValidationSchema,
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
    AuthModule,
    BoardModule
  ],
  controllers: [BoardController],
  providers: [BoardService],
})
export class AppModule {}
