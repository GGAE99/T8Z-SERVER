import { Controller, UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from 'src/auth/guard/accessToken.guard';
import { BoardService } from './board.service';

@UseGuards(AccessTokenGuard)
@Controller('board')
export class BoardController {
    constructor(
        private readonly boardService: BoardService,
    ){}

    
}
