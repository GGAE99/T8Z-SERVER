import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Board } from "./board.entity";

@Entity()
export class BoardComment extends BaseEntity {
    @PrimaryColumn({ type: 'varchar', length: 30 })
    BC_ID: number;
    
    @Column({type:'varchar', length:255})
    BC_CONTENT: string;

    @ManyToOne(() => Board, board => board.B_COMMENTS) // User 엔터티와의 관계 설정
    @JoinColumn({ name: 'B_ID' })
    BC_BOARD: Board;
}