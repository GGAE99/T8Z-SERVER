import { Module } from '@nestjs/common';
import { TypeOrmExModule } from 'src/typeorm-ex.module';
import { BoardRepository } from './board.repository';
import { UserRepository } from 'src/user/user.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';

@Module({
    imports: [
      TypeOrmExModule.forCustomRepository([
        BoardRepository, 
        UserRepository
      ]),
      PassportModule.register({ defaultStrategy: 'jwt-access' }),
      JwtModule.register({}),
    ],
    controllers: [BoardController],
    providers: [
      BoardService,
      JwtService,
    ]
  })
export class BoardModule {}
