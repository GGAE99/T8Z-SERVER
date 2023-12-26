import { BaseEntity, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { ROLE } from "../constant/user.role";
import { USER_TYPE } from "../constant/user.type";


@Entity()
export class User extends BaseEntity {

    @PrimaryColumn()
    U_ID: string;

    @Column({ type: 'varchar', unique: true })
    U_EMAIL: string;

    @Column({type: 'enum', enum: Object.values(USER_TYPE)})
    U_TYPE: string;

    @Column({ type: 'enum', enum: Object.values(ROLE) })
    U_ROLE: ROLE;
}