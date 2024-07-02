import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from 'src/auth/guard/accessToken.guard';
import { BoardService } from './board.service';
import { Board } from './entity/board.entity';
import { CreateBoardDto } from './dto/create_board.dto';

@UseGuards(AccessTokenGuard)
@Controller('board')
export class BoardController {
    constructor(
        private readonly boardService: BoardService,
    ){}

    @Get('board')
    async getBoardByDay(
        @Req() req: Request,
    ) : Promise<Board[]> {
        return await this.boardService.getBoardByDay(req);
    }

    @Post('board')
    async createBoard(
        @Body() createBoardDto: CreateBoardDto,
        @Req() req: Request,
    ) : Promise<void> {
        //await this.boardService.createBoard( createBoardDto, req);
    }

    @Delete('board/:boardId')
    async deleteBoard(
        @Param('boardId') boardId : string,
        @Req() req: Request,
    ) : Promise<void> {
        //await this.boardService.deleteBoard(postId, req);
    }

    @Put('board/:boardId')
    async updateBoard(
        @Param('boardId') boardId : string,
        @Body () updateBoardDto: UpdateBoardDto,
        @Req() req: Request,
    ) : Promise<void> {
        
        // await this.boardService.updateBoard(postId, updateBoardDto, req);
    }

}
