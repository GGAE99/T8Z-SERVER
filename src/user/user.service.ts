import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create_user.dto';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
    ) {}

    async signup(
        createUserDto: CreateUserDto,
    ): Promise<void> {
        await this.userRepository.signup(createUserDto);
    }


}
