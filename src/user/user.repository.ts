import { Repository } from "typeorm";
import { BadRequestException, NotFoundException } from "@nestjs/common";
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
        const hashedPassword = await bcrypt.hash(createUserDto.U_PASSWORD, 10);
        const user = this.create({
            U_ID: createUserDto.U_ID,
            U_TYPE: createUserDto.U_TYPE,
            U_EMAIL: createUserDto.U_EMAIL,
            U_PASSWORD: hashedPassword,
            U_NAME: createUserDto.U_NAME,
            U_NICK: createUserDto.U_NICK,
            U_RANK: createUserDto.U_RANK,
            U_FAVORITE_CHARACTER: createUserDto.U_FAVORITE_CHARACTER,
            U_CREATED: createUserDto.U_CREATED,
            U_REFRESH_TOKEN: createUserDto.U_REFRESH_TOKEN,
            U_ROLE: createUserDto.U_ROLE
        });

        if (!user) {
            throw new BadRequestException(UserErrorEnum.SIGN_UP_ERROR);
        }

        await this.save(user);
        return null
    }
}
