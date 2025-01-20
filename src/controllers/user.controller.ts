import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { UserToCreateDTO } from "../types/user/dtos";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { UserPresenter } from "../types/user/presenters";

const userService = new UserService();

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // transform userToCreateDTO en userToCreateInput (obj)
    const userToCreateDTO = plainToInstance(UserToCreateDTO, req.body, {
      excludeExtraneousValues: true,
    });

    //Controle des données
    const dtoErrors = await validate(userToCreateDTO);
    if (dtoErrors.length > 0) {
      console.log(dtoErrors);
      throw new Error("Invalid fields");
    }

    const user = await userService.registerUser(userToCreateDTO);
    // appeler le logger service pour enregistrer QUI a créer un utilisateur (peut être un admin ou l'utilisateur lui même (?)  )

    const createdUser = plainToInstance(UserPresenter, user, {
      excludeExtraneousValues: true,
    });
    res.status(201).json(createdUser); // à vous de créer une class pour gérer les success
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const { accessToken, refreshToken } = await userService.loginUser(email, password);
    res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};