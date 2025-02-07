import { ColocEntity } from "../databases/mysql/coloc.entity";
import { ColocRepository } from "../repositories/coloc.repository";
import { ColocDTO } from "../types/coloc/dtos";
import { UserEntity } from "../databases/mysql/user.entity";
import { UserRepository } from "../repositories/user.repository";
import { ColocMembershipEntity } from "../databases/mysql/coloc.membership.entity";
import { connectMySQLDB } from "../configs/databases/mysql.config";
import { ColocInputs } from "../types/coloc/inputs";

export class ColocService {
  private colocRepository = new ColocRepository();
  private userRepository = new UserRepository();
  private membershipRepository = connectMySQLDB.getRepository(ColocMembershipEntity);

  async registerColoc(colocToCreate: ColocDTO, proprietaireId: number): Promise<ColocEntity> {
    const proprietaire = await this.userRepository.findById(proprietaireId);
    if (!proprietaire) {
      throw new Error("Owner not found");
    }

    const createdColoc = this.colocRepository.create({
      admin_coloc: colocToCreate.admin_coloc,
      addresse: colocToCreate.addresse,
      surface: colocToCreate.surface,
      nb_de_piece: colocToCreate.nb_de_piece,
      loyer: colocToCreate.loyer,
      proprietaire: proprietaire,
    } as ColocInputs);

    const savedColoc = await this.colocRepository.save(createdColoc);
    return savedColoc;
  }

  async getColocMembers(colocId: number): Promise<UserEntity[]> {
    const coloc = await this.colocRepository.findById(colocId);
    if (!coloc) {
      throw new Error("Coloc not found");
    }

    const memberships = await this.membershipRepository.find({ where: { coloc: { id: colocId } }, relations: ["user"] });
    return memberships.map(membership => membership.user);
  }

  async addMember(colocId: number, userId: number, ownerId: number): Promise<ColocMembershipEntity> {
    const coloc = await this.colocRepository.findById(colocId);
    if (!coloc) {
      throw new Error("Coloc not found");
    }

    if (!coloc.proprietaire || coloc.proprietaire.id !== ownerId) {
      throw new Error("Only the owner can add members");
    }

    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const membership = this.membershipRepository.create({
      coloc: coloc,
      user: user,
    });

    return await this.membershipRepository.save(membership);
  }

  async removeMember(colocId: number, userId: number, ownerId: number): Promise<void> {
    const coloc = await this.colocRepository.findById(colocId);
    if (!coloc) {
      throw new Error("Coloc not found");
    }

    if (!coloc.proprietaire || coloc.proprietaire.id !== ownerId) {
      throw new Error("Only the owner can remove members");
    }

    const membership = await this.membershipRepository.findOne({ where: { coloc: { id: colocId }, user: { id: userId } } });
    if (!membership) {
      throw new Error("Membership not found");
    }

    await this.membershipRepository.remove(membership);
  }

  async deleteColoc(id: number, ownerId: number): Promise<void> {
    const coloc = await this.colocRepository.findById(id);
    if (!coloc) {
      throw new Error("Coloc not found");
    }

    if (!coloc.proprietaire || coloc.proprietaire.id !== ownerId) {
      throw new Error("Only the owner can delete the coloc");
    }

    await this.colocRepository.delete(id);
  }

  async transferOwnership(colocId: number, newOwnerId: number, currentOwnerId: number): Promise<ColocEntity> {
    const coloc = await this.colocRepository.findById(colocId);
    if (!coloc) {
      throw new Error("Coloc not found");
    }

    if (!coloc.proprietaire || coloc.proprietaire.id !== currentOwnerId) {
      throw new Error("Only the current owner can transfer ownership");
    }

    const newOwner = await this.userRepository.findById(newOwnerId);
    if (!newOwner) {
      throw new Error("New owner not found");
    }

    coloc.proprietaire = newOwner;
    return await this.colocRepository.save(coloc);
  }
}