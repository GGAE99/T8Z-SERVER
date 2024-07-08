import { CustomRepository } from "src/typeorm-ex.decorator";
import { Repository } from "typeorm";
import { uuid } from "uuidv4";
import { Board } from "./entity/board.entity";
import { BOARD_ERROR_MESSAGE } from "src/common/error/board.error.enum";
import { NotFoundException } from "@nestjs/common";

@CustomRepository(Board)
export class BoardRepository extends Repository<Board> {
    async getAllBoard(
    ): Promise<Board[]>{
        const found = await this.find();
        if (!found) {
            throw new NotFoundException(BOARD_ERROR_MESSAGE.NOT_BOARD);
        }
        return found;
    }
}