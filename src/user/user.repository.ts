import { Repository } from "typeorm";
import { BadRequestException, NotFoundException } from "@nestjs/common";
// import { CreateUserDto } from "./dto/create-user.dto";
import { CustomRepository } from "src/typeorm-ex.decorator";
import { uuid } from "uuidv4";
import * as bcrypt from 'bcrypt';
import { User } from "./entity/user.entity";
import { ROLE } from "./constant/user.role";
import { UserErrorEnum } from "./error/user.error.enum";
import { CreateUserDto } from "./dto/create_user.dto";
// import { UserLoginDto } from "./dto/user-login.dto";

@CustomRepository(User)
export class UserRepository extends Repository<User>{
    async signup(
        createUserDto: CreateUserDto,
    ) : Promise<void> {
        
    }
}
