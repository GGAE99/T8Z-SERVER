import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SignInUserDto{
    @IsNotEmpty()
    @IsEmail()
    U_EMAIL: string;

    @IsString()
    @IsNotEmpty()
    U_PASSWORD: string;
}