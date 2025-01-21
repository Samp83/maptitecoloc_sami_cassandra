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
    throw error;
  }
};

export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = Number(req.params.id);
    if (isNaN(userId)) {
      throw new Error("Invalid user ID");
    }
    const user = await userService.getUserById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    res.status(200).json(user);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const userService = new UserService();
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = await userService.updateUser(Number(req.params.id), req.body);
    res.status(200).json(user);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    await userService.deleteUser(Number(req.params.id));
    res.status(204).json({ message: "User deleted successfully" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const { accessToken, refreshToken } = await userService.loginUser(
      email,
      password
    );
    res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: "An unknown error occurred" });
    }
  }
};
