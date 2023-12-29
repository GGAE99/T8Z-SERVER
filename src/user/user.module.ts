import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmExModule } from 'src/typeorm-ex.module';
// import { UserRepository } from './user.repository';

@Module({
  // imports: [
  //   TypeOrmExModule.forCustomRepository([UserRepository]),
  //   // PassportModule.register({ defaultStrategy: 'jwt-access' }),
  //   // JwtModule.register({}),
  // ],

  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
