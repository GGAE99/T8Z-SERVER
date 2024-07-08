import { Injectable, Req } from '@nestjs/common';
import { UserRepository } from 'src/user/user.repository';
import { BoardRepository } from './board.repository';
import { Board } from './entity/board.entity';

@Injectable()
export class BoardService {
    constructor(
        private readonly boardRepository: BoardRepository,
        private readonly userRepository: UserRepository,        
    ){}

    async getAllBoard(
    ): Promise<Board[]>{
        return await this.boardRepository.getAllBoard();
    }
}
