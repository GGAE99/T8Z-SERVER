import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/user/user.repository';
import { BoardRepository } from './board.repository';

@Injectable()
export class BoardService {
    constructor(
        private readonly boardRepository: BoardRepository,
        private readonly userRepository: UserRepository,        
    ){}
}
