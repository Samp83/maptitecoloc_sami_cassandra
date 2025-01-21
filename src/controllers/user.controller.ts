import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { UserToCreateDTO } from "../types/user/dtos";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { UserPresenter } from "../types/user/presenters";
import { SuccessHandler } from "../utils/success.handler";
import { LogHandler } from "../utils/log.handler";

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

    const createdUser = plainToInstance(UserPresenter, user, {
      excludeExtraneousValues: true,
    });
    await LogHandler.logAction("CREATE_USER", user.id.toString());
    res
      .status(201)
      .json(
        SuccessHandler.success("User registered successfully", createdUser, 201)
      );
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
    res
      .status(200)
      .json(SuccessHandler.success("User retrieved successfully", user));
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
    const users = await userService.getAllUsers();
    res
      .status(200)
      .json(SuccessHandler.success("Users fetched successfully", users));
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
    const userId = Number(req.params.id);
    if (isNaN(userId)) {
      throw new Error("Invalid user ID");
    }

    const user = await userService.updateUser(Number(req.params.id), req.body);
    await LogHandler.logAction("UPDATE_USER", userId.toString());
    res
      .status(200)
      .json(SuccessHandler.success("User updated successfully", user));
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
    const userId = Number(req.params.id);
    if (isNaN(userId)) {
      throw new Error("Invalid user ID");
    }

    await userService.deleteUser(Number(req.params.id));
    await LogHandler.logAction("DELETE_USER", userId.toString());
    res
      .status(204)
      .json(SuccessHandler.success("User deleted successfully", null, 204));
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
    res.status(200).json(
      SuccessHandler.success("Login successful", {
        accessToken,
        refreshToken,
      })
    );
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: "An unknown error occurred" });
    }
  }
};

export const getUserProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    if (!userId) {
      throw new Error("User ID not found in request");
    }

    const user = await userService.getUserById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    res
      .status(200)
      .json(
        SuccessHandler.success("User profile retrieved successfully", user)
      );
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: "An unknown error occurred" });
    }
  }
};
