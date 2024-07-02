import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, } from "typeorm";
import { B_TYPE } from "../constant/board_type.enum";
import { User } from "src/user/entity/user.entity";
import { BoardFile } from "./board_file.entity";
import { BoardReported } from "./board_reported.entity";
import { BoardComment } from "./board_comment.entity";

@Entity()
export class Board extends BaseEntity {
    @PrimaryColumn({ type: 'varchar', length: 30 })
    B_ID: string;

    @Column({type:'varchar', length:100})
    B_HEAD: string;

    @Column({type:'text'})
    B_CONTENT: string;

    @Column({type:'varchar', enum: Object.values(B_TYPE)})
    B_TYPE: B_TYPE;

    @Column({type:'int'})
    B_LIKE: number;

    @Column({type:'int'})
    B_UNLIKE: number;

    @Column({type:'int'})
    B_FILE_COUNT: number;

    @Column({type:'date'})
    B_CREATED: Date;

    @Column({type:'date'})
    B_UPDATED: Date;

    @Column({type:'int'})
    B_COMMENT_COUNT: number;

    @Column({type:'int'})
    B_REPORTED_COUNT: number;    

    @ManyToOne(() => User, user => user.U_BOARDS) // User 엔터티와의 관계 설정
    @JoinColumn({ name: 'U_ID' })
    B_USER: User;

    @OneToMany(()=> BoardFile, boardFile=> boardFile.BF_BOARD)
    B_BOARD_FILES: BoardFile[]

    @OneToMany(()=> BoardReported, boardReported=> boardReported.BR_BOARD)
    B_REPOTED: BoardReported[]

    @OneToMany(()=> BoardComment, boardComment => boardComment.BC_ID)
    B_COMMENTS: BoardComment[]
}