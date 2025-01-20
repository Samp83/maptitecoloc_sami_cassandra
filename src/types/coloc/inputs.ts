import { IsString, IsNumber } from "class-validator";
import { ColocEntity } from "../../databases/mysql/coloc.entity";

export class ColocInputs {
    @IsString()
    proprietaire: ColocEntity['proprietaire'];

    @IsString()
    admin_coloc: ColocEntity['admin_coloc'];

    @IsString()
    addresse: ColocEntity['addresse'];

    @IsNumber()
    surface: ColocEntity['surface'];

    @IsNumber()
    nb_de_piece: ColocEntity['nb_de_piece'];

    @IsNumber()
    loyer: ColocEntity['loyer'];
}