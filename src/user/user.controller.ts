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

    ): Promise<void> {
        const DefalutCreateUserDto = await this.userService.createUserDefaultInfo(createUserDto)
        console.log(createUserDto)
        
        await this.userService.signup(DefalutCreateUserDto)
    }


}
