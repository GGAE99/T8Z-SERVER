import { Repository } from "typeorm";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { CustomRepository } from "src/typeorm-ex.decorator";
import { User } from "./entity/user.entity";
import { ROLE } from "./constant/user.role";
import { USER_ERROR_ENUM } from "../common/error/user.error.enum";
import { CreateUserDto } from "./dto/create_user.dto";
import { SignInUserDto } from "./dto/signIn_user.dto";
// import { UserLoginDto } from "./dto/user-login.dto";

@CustomRepository(User)
export class UserRepository extends Repository<User>{

    async signUp( // 회원 가입
        createUserDto: CreateUserDto,
    ) : Promise<void> {
        const user = this.create({
            U_ID: createUserDto.U_ID,
            U_TYPE: createUserDto.U_TYPE,
            U_EMAIL: createUserDto.U_EMAIL,
            U_PASSWORD: createUserDto.U_PASSWORD,
            U_NAME: createUserDto.U_NAME,
            U_NICK: createUserDto.U_NICK,
            U_RANK: createUserDto.U_RANK,
            U_FAVORITE_CHARACTER: createUserDto.U_FAVORITE_CHARACTER,
            U_CREATED: createUserDto.U_CREATED,
            U_REFRESH_TOKEN: createUserDto.U_REFRESH_TOKEN,
            U_ROLE: createUserDto.U_ROLE
        });

        if (!user) {
            throw new BadRequestException(USER_ERROR_ENUM.SIGN_UP_ERROR);
        }

        await this.save(user);
        return null
    }    

    async getAllUsers(): Promise<User[]> {
        const found = await this.find();
        if (!found) {
            throw new NotFoundException(USER_ERROR_ENUM.USER_NOT_FOUND);
        }
        return found;
    }

    async findByEmail( // eamil로 User 찾기
        U_EMAIL: string,
    ): Promise<User>{
        const found = await this.findOne({
            where: { 
                U_EMAIL,
            }
        });
        if (!found) {
            throw new NotFoundException(USER_ERROR_ENUM.NO_FOUND_USER);
        }
        return found
    }

    async updateRefreshToken(U_EMAIL: string, refreshToken: string) {
        const user = await this.findByEmail(U_EMAIL)
        user.U_REFRESH_TOKEN = refreshToken;
        await this.save(user);
    }
}
