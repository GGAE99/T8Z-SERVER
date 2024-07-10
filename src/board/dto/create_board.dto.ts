import { IsDate, IsNotEmpty, IsNumber, IsString, isNotEmpty } from "class-validator";
import { B_TYPE } from "../constant/board_type.enum";


export class CreateBoardDto{
    @IsString()
    @IsNotEmpty()
    B_ID: string;

    @IsString()
    @IsNotEmpty()
    B_HEAD:string;

    @IsString()
    @IsNotEmpty()
    B_CONTENT: string;

    @IsNotEmpty()
    B_TYPE: B_TYPE;
    
    @IsNumber()
    @IsNotEmpty()
    B_UNLIKE: number;
    
    @IsNumber()
    @IsNotEmpty()
    B_FILE_COUNT: number;

    // @IsNumber()
    // @IsNotEmpty()
    // B_LIKE: number;

    // @IsDate()
    // @IsNotEmpty()
    // B_CREATED: Date;

    // @IsDate()
    // @IsNotEmpty()
    // B_UPDATED: Date;

    // @IsNumber()
    // @IsNotEmpty()
    // B_COMMENT_COUNT: number;

    // @IsNumber()
    // @IsNotEmpty()
    // B_REPORTED_COUNT: number;
}