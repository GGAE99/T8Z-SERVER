import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { SignInUserDto } from 'src/user/dto/signIn_user.dto';
import { AuthService } from './auth.service';
import { RefreshTokenGuard } from './guard/refreshToken.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ){}
    // 로그인
    @Post('sessions')
    async signIn(
        @Body() signinUserDto: SignInUserDto,
        @Res({ passthrough: true }) response: Response,
    ): Promise<void>{
        await this.authService.singIn(signinUserDto, response)
    }

    // 로그아웃;
    @UseGuards(RefreshTokenGuard)
    @Get('sessions')
    async logout(
        @Res({ passthrough: true }) response: Response,
    ): Promise<void>{
        return await this.authService.logout(response)
    }
}
