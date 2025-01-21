import { Request, Response } from "express";
import { ColocService } from "../services/coloc.service";
import { ColocDTO } from "../types/coloc/dtos";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { ColocPresenter } from "../types/coloc/presenters";
import { SuccessHandler } from "../utils/success.handler";

const colocService = new ColocService();

export const registerColoc = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const colocDTO = plainToInstance(ColocDTO, req.body, {
      excludeExtraneousValues: true,
    });

    const dtoErrors = await validate(colocDTO);
    if (dtoErrors.length > 0) {
      console.log(dtoErrors);
      throw new Error("Invalid fields");
    }

    const coloc = await colocService.registerColoc(colocDTO, userId);
    const createdColoc = plainToInstance(ColocPresenter, coloc, {
      excludeExtraneousValues: true,
    });
    res.status(201).json(SuccessHandler.success("Coloc registered successfully", createdColoc, 201));
  } catch (error) {
    throw error;
  }
};

export const addMember = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const colocId = Number(req.params.id);
    const memberId = Number(req.body.userId);
    const membership = await colocService.addMember(colocId, memberId, userId);
    res.status(201).json(SuccessHandler.success("Member added successfully", membership, 201));
  } catch (error) {
    {
      res.status(500).json({ error: "Only the owner can modify members of a coloc" });
    }
  }
};

export const removeMember = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const colocId = Number(req.params.id);
    const memberId = Number(req.body.userId);
    await colocService.removeMember(colocId, memberId, userId);
    res.status(204).json(SuccessHandler.success("Member removed successfully", null, 204));
  } catch (error) {
    res.status(500).json({ error: "Only the owner can modify members of a coloc" });
  }
};

export const deleteColoc = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    await colocService.deleteColoc(Number(req.params.id), userId);
    res.status(204).json(SuccessHandler.success("Coloc deleted successfully", null, 204));
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};