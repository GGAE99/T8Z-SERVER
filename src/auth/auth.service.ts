import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CookieKeys, JwtPayload, JwtPayloadWithRefreshToken, Tokens } from './constant/auth.type';
import { AUTH_ERROR_MESSAGE } from './Error/auth.error.enum';
import { UserRepository } from 'src/user/user.repository';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { SignInUserDto } from 'src/user/dto/signIn_user.dto';
import { MyConfigType } from 'src/common/myconfig.type';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private configService: ConfigService<MyConfigType>,
        private readonly userRepository: UserRepository
    ) { }

    async logout(
        { U_EMAIL, }: Partial<JwtPayloadWithRefreshToken>,
        response: Response,
    ): Promise<void> {
        response.clearCookie(CookieKeys.ACCESS_TOKEN);
        response.clearCookie(CookieKeys.REFRESH_TOKEN);
        await this.userRepository.updateRefreshToken(U_EMAIL, null);
    }

    async refreshAccessToken(
        { U_EMAIL, refreshToken, }: Partial<JwtPayloadWithRefreshToken>,
        response: Response,
    ): Promise<void> {
        const user = await this.userRepository.findByEmail(U_EMAIL);
        if (!user || !user.U_REFRESH_TOKEN)
            throw new ForbiddenException(AUTH_ERROR_MESSAGE.NOT_LOGINED);

        const isValid = await bcrypt.compare(refreshToken, user.U_REFRESH_TOKEN);
        if (user && isValid) {
            const accesstoken = await this.getAccessToken(user.U_EMAIL);
            this.setAccessTokenToCookie(response, accesstoken);
        }else{
            throw new ForbiddenException(AUTH_ERROR_MESSAGE.INVALID_TOKEN);
        }
    }

    // async refreshTokens(
    //     { U_EMAIL, refreshToken, }: Partial<JwtPayloadWithRefreshToken>,
    //     response: Response,
    // ): Promise<void> {
    //     const user = await this.userRepository.findByEmail(U_EMAIL);
    //     if (!user || !user.U_REFRESH_TOKEN)
    //         throw new ForbiddenException(AUTH_ERROR_MESSAGE.NOT_LOGINED);

    //     const isValid = await bcrypt.compare(refreshToken, user.U_REFRESH_TOKEN);
    //     if (user && isValid) {
    //         const tokens = await this.getTokens(user.U_EMAIL);
    //         await this.updateRefreshToken(user.U_EMAIL, tokens.refreshToken);
    //         this.setTokensToCookie(response, tokens);            
    //     }else{
    //         throw new ForbiddenException(AUTH_ERROR_MESSAGE.INVALID_TOKEN);
    //     }
    // }

    async getTokens(
        U_EMAIL: string,
    ): Promise<Tokens> {
        const payload: JwtPayload = { U_EMAIL };

        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload, {
                secret: this.configService.get('JWT_ACCESS_SECRET'),
                expiresIn: this.configService.get('ACCESS_TOKEN_EXPIRE_SEC') + 's',
            }),
            this.jwtService.signAsync(payload, {
                secret: this.configService.get('JWT_REFRESH_SECRET'),
                expiresIn: this.configService.get('REFRESH_TOKEN_EXPIRE_SEC') + 's',
            }),
        ]);

        return { accessToken, refreshToken };
    }

    async getAccessToken(
        U_EMAIL: string,
    ): Promise<string>{
        const payload: JwtPayload = { U_EMAIL };
        const accessToken = await this.jwtService.signAsync(payload, {
            secret: this.configService.get('JWT_ACCESS_SECRET'),
            expiresIn: this.configService.get('ACCESS_TOKEN_EXPIRE_SEC') + 's',
        })
        return accessToken
    }

    async updateRefreshToken(
            U_EMAIL: string,
            refreshToken: string
        ) : Promise<void>{
        const hashed = await bcrypt.hash(refreshToken, 10);
        await this.userRepository.updateRefreshToken(U_EMAIL, hashed);
    }

    setTokensToCookie(
        response: Response,
        tokens: Tokens
        ): void {
        response.cookie(CookieKeys.ACCESS_TOKEN, tokens.accessToken, {
            httpOnly: true,
            expires: this.getExpiredDate(
                this.configService.get('ACCESS_TOKEN_EXPIRE_SEC'),
            ),
        });
        response.cookie(CookieKeys.REFRESH_TOKEN, tokens.refreshToken, {
            httpOnly: true,
            expires: this.getExpiredDate(                
                this.configService.get('REFRESH_TOKEN_EXPIRE_SEC'),
            ),
        });
    }

    setAccessTokenToCookie(
        response: Response,
        accessToken: string,
    ): void {
        response.cookie(CookieKeys.ACCESS_TOKEN, accessToken, {
            httpOnly: true,
            expires: this.getExpiredDate(
                this.configService.get('ACCESS_TOKEN_EXPIRE_SEC'),
            ),
        });
    }

    getExpiredDate(expireSec: number): Date {
        return new Date(+new Date() + expireSec * 1000);
    }

}
