import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ROLE } from "../constant/user.role";
import { T_F_CHARACTER_NAME } from "../constant/user.tekken.character";

export class CreateUserDto{
    @IsNotEmpty()
    U_TYPE: string;

    @IsNotEmpty()
    @IsEmail()
    U_EMAIL: string;

    @IsString()
    @IsNotEmpty()
    U_PASSWORD: string;

    @IsString()
    @IsNotEmpty()
    U_NAME: string;

    @IsString()
    @IsNotEmpty()
    U_NICK: string;

    @IsString()
    @IsNotEmpty()
    U_RANK: string;
    
    @IsNotEmpty()
    U_FAVORITE_CHARACTER: T_F_CHARACTER_NAME;

    @IsString()
    @IsNotEmpty()
    U_CREATED: string;

    @IsString()
    @IsNotEmpty()
    U_REFRESH_TOKEN: string;

    @IsNotEmpty()
    U_ROLE: ROLE;
}