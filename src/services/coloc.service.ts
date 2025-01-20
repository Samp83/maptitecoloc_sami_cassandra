import { ColocEntity } from "../databases/mysql/coloc.entity";
import { ColocRepository } from "../repositories/coloc.repository";
import { ColocDTO } from "../types/coloc/dtos";


export class ColocService {
  private colocRepository = new ColocRepository();

  async registerColoc(colocToCreate: ColocDTO): Promise<ColocEntity> {
    // Create the coloc
    const createdColoc = this.colocRepository.create({
      proprietaire: colocToCreate.proprietaire,
      admin_coloc: colocToCreate.admin_coloc,
      addresse: colocToCreate.addresse,
      surface: colocToCreate.surface,
      nb_de_piece: colocToCreate.nb_de_piece,
      loyer: colocToCreate.loyer,
    });

    // Save the coloc
    const savedColoc = await this.colocRepository.save(createdColoc);

    // Return the created coloc
    return savedColoc;
  }
}