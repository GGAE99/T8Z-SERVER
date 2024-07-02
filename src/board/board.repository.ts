import { CustomRepository } from "src/typeorm-ex.decorator";
import { Repository } from "typeorm";
import { uuid } from "uuidv4";
import { Board } from "./entity/board.entity";

@CustomRepository(Board)
export class BoardRepository extends Repository<Board> {}