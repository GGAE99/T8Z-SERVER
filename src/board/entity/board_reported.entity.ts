import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Board } from "./board.entity";

@Entity()
export class BoardReported extends BaseEntity {
    @PrimaryColumn({ type: 'varchar', length: 30 })
    BR_ID: number;
    
    @Column({type:'varchar', length:100})
    BR_CONTENT: string;

    @ManyToOne(() => Board, board => board.B_BOARD_FILES) // User 엔터티와의 관계 설정
    @JoinColumn({ name: 'B_ID' })
    BR_BOARD: Board;
}