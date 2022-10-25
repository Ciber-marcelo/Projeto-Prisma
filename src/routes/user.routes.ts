import { Router } from "express";
import { CreateUserController } from "../modules/users/useCases/createUser/CreateUserController";

const createUserController = new CreateUserController();
const getAllUsersController = new CreateUserController();

const userRoutes = Router();

userRoutes.post("/", createUserController.handle);
userRoutes.get("/", getAllUsersController.handle);

export { userRoutes };
