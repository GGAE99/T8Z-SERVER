export type Tokens = {
  accessToken: string;
  refreshToken: string;
};

export interface JwtPayload {
  U_EMAIL: string;
}



export enum CookieKeys {
  ACCESS_TOKEN = 'T8ZAppAT',
  REFRESH_TOKEN = 'T8ZAppRT',
}

export type UserPayload = {
  email: string;
}

type RefreshTokenObj = { refreshToken: string };
export type JwtPayloadWithRefreshToken = JwtPayload & RefreshTokenObj;