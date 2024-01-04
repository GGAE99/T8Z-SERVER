import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create_user.dto';
import { ROLE } from './constant/user.role';
import { T_F_CHARACTER_NAME } from './constant/user.tekken.character';
import { uuid } from 'uuidv4';
import { SignInUserDto, } from './dto/signIn_user.dto';
import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { AUTH_ERROR_MESSAGE } from 'src/auth/Error/auth.error.enum';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
    constructor(
        @Inject(AuthService) private readonly authService: AuthService,
        private readonly userRepository: UserRepository,
    ) {}    
    
    async signUp( // 회원 가입
        createUserDto: CreateUserDto,
        ): Promise<void> {
        await this.userRepository.signUp(createUserDto);
    }

    async singIn( // 로그인
        signInUserDto: SignInUserDto,
        response: Response,
    ): Promise<void>{
        const user = await this.findByEmail(signInUserDto.U_EMAIL);
        const match = await bcrypt.compare(signInUserDto.U_PASSWORD, user.U_PASSWORD);

        if (user && match) {            
            const tokens = await this.authService.getTokens(user.U_EMAIL);            
            await this.authService.updateRefreshToken(user.U_EMAIL, tokens.refreshToken);
            return this.authService.setTokensToCookie(response, tokens);
        }else{
            throw new UnauthorizedException(AUTH_ERROR_MESSAGE.INVALID_CREDENTIAL);
        }
    }

    async getAllUsers(  // 모든 회원 가져오기 / 꼭 지워야함
    ): Promise<User[]> {
        return await this.userRepository.getAllUsers();
    }

    async logout(
        request,
        response: Response
    ): Promise<void>{
        console.log(request.user)
        return await this.authService.logout(request.user, response)
    }

    async refreshAccessToken(
        request,
        response: Response
    ): Promise<void>{
        return await this.authService.refreshAccessToken(request.user, response)
    }
    
    async findByEmail(
        U_EMAIL: string
    ): Promise<User>{
        return await this.userRepository.findByEmail(U_EMAIL)
    }

    async createUserDefaultInfo( // 기본값 대입 함수
        createUserDto : CreateUserDto,
    ): Promise<CreateUserDto>{
        createUserDto.U_ID = uuid()
        createUserDto.U_REFRESH_TOKEN = null;
        createUserDto.U_FAVORITE_CHARACTER = T_F_CHARACTER_NAME.NOT_YET;
        createUserDto.U_ROLE = ROLE.USER;
        createUserDto.U_PASSWORD = await this.passwordEncryption(createUserDto.U_PASSWORD)
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().slice(0, 10);
        createUserDto.U_CREATED = formattedDate
        return createUserDto
    }
    
    async passwordEncryption( // 비밀번호 암호화 함수
        U_PASSWORD: string,
    ): Promise<string>{
        const hashedPassword = await bcrypt.hash(U_PASSWORD, 10);
        return hashedPassword
    }

}
