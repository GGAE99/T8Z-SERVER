import { BaseEntity, Column, Entity, PrimaryColumn, } from "typeorm";


@Entity()
export class Board extends BaseEntity {
    @PrimaryColumn({ type: 'int', length: 11 })
    B_ID: number;

    @Column()

    @Column
    U_ID: string;
}