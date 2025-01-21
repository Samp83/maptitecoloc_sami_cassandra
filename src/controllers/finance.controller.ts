import { Request, Response } from "express";
import { FinanceService } from "../services/finance.service";
import { FinanceDTO } from "../types/finance/dtos";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { SuccessHandler } from "../utils/success.handler";

const financeService = new FinanceService();

export const addCharge = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const colocId = Number(req.params.colocId);
    const financeDTO = plainToInstance(FinanceDTO, req.body, {
      excludeExtraneousValues: true,
    });

    const dtoErrors = await validate(financeDTO);
    if (dtoErrors.length > 0) {
      console.log(dtoErrors);
      throw new Error("Invalid fields");
    }

    const finance = await financeService.addCharge(financeDTO, userId, colocId);
    res.status(201).json(SuccessHandler.success("Charge added successfully", finance, 201));
  } catch (error) {
    throw error;
  }
};

export const removeCharge = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const financeId = Number(req.params.id);
    await financeService.removeCharge(financeId);
    res.status(204).json(SuccessHandler.success("Charge removed successfully", null, 204));
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};