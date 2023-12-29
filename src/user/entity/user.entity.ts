import { BaseEntity, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { ROLE } from "../constant/user.role";
import { USER_TYPE } from "../constant/user.type";
import { T_F_CHARACTER_NAME } from "../constant/user.tekken.character";


@Entity()
export class User extends BaseEntity {
    @PrimaryColumn()
    U_ID: string;

    @Column({type: 'enum', enum: Object.values(USER_TYPE)})
    U_TYPE: string;

    @Column({ type: 'varchar', unique: true })
    U_EMAIL: string;    

    @Column({type: 'varchar'})
    U_PASSWORD: string;

    @Column({type: 'varchar'})
    U_NAME: string;

    @Column({type: 'varchar'})
    U_NICK: string;

    @Column({type: 'varchar'})
    U_RANK: string;

    @Column({type: 'varchar', enum: Object.values(T_F_CHARACTER_NAME)}) // 철권 캐릭터 이름으로 한정 / enum으로 줄지 DB에서 가져와 띄워줄지 고민
    U_FAVORITE_CHARACTER: T_F_CHARACTER_NAME; //string 대신 사용해도 괜찮나?

    @Column({type: 'date'})
    U_CREATED: string;

    @Column({type: 'varchar'})
    U_REFRESH_TOKEN: string;

    @Column({ type: 'enum', enum: Object.values(ROLE) })
    U_ROLE: ROLE;
}