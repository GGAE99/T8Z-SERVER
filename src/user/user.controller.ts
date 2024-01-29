import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create_user.dto';
import { SignInUserDto } from './dto/signIn_user.dto';
import { Request, Response } from 'express';
import { AccessTokenGuard } from 'src/auth/guard/accessToken.guard';
import { User } from './entity/user.entity';
import { RefreshTokenGuard } from 'src/auth/guard/refreshToken.guard';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ){}

    @Post('signUp')
    async signUp(        
        @Body() createUserDto: CreateUserDto,
    ): Promise<void> {
        const test = 'ss'
        const defalutCreateUserDto = await this.userService.createUserDefaultInfo(createUserDto)
        await this.userService.signUp(defalutCreateUserDto)
    }

    @Post('signIn')
    async signIn(
        @Body() signinUserDto: SignInUserDto,
        @Res({ passthrough: true }) response: Response,
    ): Promise<void>{
        await this.userService.singIn(signinUserDto, response)
    }

    @UseGuards(RefreshTokenGuard)
    @Get('logout')
    async logout(
        @Req() request: Request,
        @Res({ passthrough: true }) response: Response,
    ): Promise<void>{
        return await this.userService.logout(request, response)
    }

    @UseGuards(AccessTokenGuard)
    @Get('getAllUser')
    async getAllUsers(        
    ): Promise<User[]> {
        return await this.userService.getAllUsers();
    }

    @UseGuards(RefreshTokenGuard)
    @Get('refresh')
    async refresh(
        @Req() request: Request,
        @Res({ passthrough: true }) response: Response,
    ): Promise<void> {
        return await this.userService.refreshAccessToken(request, response);
    }


}
