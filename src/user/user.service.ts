import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create_user.dto';
import { ROLE } from './constant/user.role';
import { T_F_CHARACTER_NAME } from './constant/user.tekken.character';
import { uuid } from 'uuidv4';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
    ) {}
    
    async createUserDefaultInfo(
        createUserDto : CreateUserDto,
    ): Promise<CreateUserDto>{
        createUserDto.U_ID = uuid()
        createUserDto.U_REFRESH_TOKEN = null;
        createUserDto.U_FAVORITE_CHARACTER = T_F_CHARACTER_NAME.NOT_YET;
        createUserDto.U_ROLE = ROLE.USER;

        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().slice(0, 10);

        createUserDto.U_CREATED = formattedDate
        return createUserDto
    }

    async signup(
        createUserDto: CreateUserDto,
    ): Promise<void> {
        await this.userRepository.signup(createUserDto);
    }


}
