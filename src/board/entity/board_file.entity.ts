import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, } from "typeorm";
import { Board } from "./board.entity";

@Entity()
export class BoardFile extends BaseEntity {
    @PrimaryColumn({ type: 'varchar', length: 30 })
    BF_ID: number;

    @Column({type:'varchar', length:255})
    BF_ORIGIN_NAME: string;

    @Column({type:'varchar', length:255})
    BF_FILE_NAME: string;

    @ManyToOne(() => Board, board => board.B_BOARD_FILES) // User 엔터티와의 관계 설정
    @JoinColumn({ name: 'B_ID' })
    BF_BOARD: Board;
}