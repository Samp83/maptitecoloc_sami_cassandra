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
    // Transform ColocDTO from request body
    const colocDTO = plainToInstance(ColocDTO, req.body, {
      excludeExtraneousValues: true,
    });

    // Validate the DTO
    const dtoErrors = await validate(colocDTO);
    if (dtoErrors.length > 0) {
      console.log(dtoErrors);
      throw new Error("Invalid fields");
    }

    const coloc = await colocService.registerColoc(colocDTO); // Use colocDTO
    // Call the logger service to record who created the coloc (could be an admin or the user themselves)

    const createdColoc = plainToInstance(ColocPresenter, coloc, {
      excludeExtraneousValues: true,
    });
    res
      .status(201)
      .json(
        SuccessHandler.success(
          "User registered successfully",
          createdColoc,
          201
        )
      );
  } catch (error) {
    throw error;
  }
};
