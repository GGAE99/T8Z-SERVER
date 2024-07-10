import { IsDate, IsNotEmpty, IsNumber, IsString, isNotEmpty } from "class-validator";
import { B_TYPE } from "../constant/board_type.enum";

export class UpdateBoardDto{
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
}