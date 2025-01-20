import { Expose } from "class-transformer";
import { ColocEntity } from "../../databases/mysql/coloc.entity";
import { IsString, IsNumber, IsBoolean, MinLength, isNumber } from "class-validator";

export class ColocPresenter {
    @Expose()
    
    id: number;

    @Expose()
    @IsString()
    proprietaire: string;

    @Expose()
    @IsString()
    admin_coloc: string;

    @Expose()
    @IsString()
    addresse: string;

    @Expose()
    @IsNumber()
    surface: number;

    @Expose()
    @IsNumber()
    nb_de_piece: number;

    @Expose()
    @IsNumber()
    loyer: number;
}