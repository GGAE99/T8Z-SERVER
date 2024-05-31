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

    // 회원가입
    @Post('users')
    async signUp(        
        @Body() createUserDto: CreateUserDto,
    ): Promise<void> {
        const defalutCreateUserDto = await this.userService.createUserDefaultInfo(createUserDto)
        await this.userService.signUp(defalutCreateUserDto)
    }

    // 모든 회원 조회
    @UseGuards(AccessTokenGuard)
    @Get('users')
    async getAllUsers(        
    ): Promise<User[]> {
        return await this.userService.getAllUsers();
    }

    // 로그인
    @Post('sessions')
    async signIn(
        @Body() signinUserDto: SignInUserDto,
        @Res({ passthrough: true }) response: Response,
    ): Promise<void>{
        await this.userService.singIn(signinUserDto, response)
    }

    // 로그아웃
    @UseGuards(RefreshTokenGuard)
    @Get('sessions')
    async logout(
        @Res({ passthrough: true }) response: Response,
    ): Promise<void>{
        return await this.userService.logout(response)
    }
    
    // AT 재발급
    @UseGuards(RefreshTokenGuard)
    @Get('refresh')
    async refresh(
        @Req() request: Request,
        @Res({ passthrough: true }) response: Response,
    ): Promise<void> {
        return await this.userService.refreshAccessToken(request, response);
    }

}
