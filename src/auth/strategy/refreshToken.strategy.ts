import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { CookieKeys,  JwtPayload,  JwtPayloadWithRefreshToken,} from '../constant/auth.type';
import { MyConfigType } from 'src/common/config/myconfig.type';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    private configService: ConfigService<MyConfigType>,
  ) {
    super({
      secretOrKey: configService.get('JWT_REFRESH_SECRET'),
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request && request?.cookies[CookieKeys.REFRESH_TOKEN];
        }
      ]),
      passReqToCallback: true,
    });
  }

  async validate(
    req: Request,
    payload: JwtPayload,
  ): Promise<JwtPayloadWithRefreshToken> {
    const refreshToken = req?.cookies[CookieKeys.REFRESH_TOKEN];
    if (!refreshToken) throw new UnauthorizedException();
    return { ...payload, refreshToken };
  }
}
