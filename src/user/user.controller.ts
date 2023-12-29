import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create_user.dto';
import { T_F_CHARACTER_NAME } from './constant/user.tekken.character';
import { ROLE } from './constant/user.role';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ){}

    @Post('signup')
    async signup(
        @Body() createUserDto: CreateUserDto, 
        /*
            created는 이 지점에서 생성
            refreshToken은 null
            ROLE은 기본적으로 USER
            주캐는 NOT_YET

            front에서 주는 data에 위의 4개의 데이터는 포함할 필요 없음
        */
    ): Promise<void> {
        createUserDto.U_REFRESH_TOKEN = null;
        createUserDto.U_FAVORITE_CHARACTER = T_F_CHARACTER_NAME.NOT_YET;
        createUserDto.U_ROLE = ROLE.USER;

        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().slice(0, 10);
        createUserDto.U_CREATED = formattedDate
        
        await this.userService.signup(createUserDto)
    }
}
