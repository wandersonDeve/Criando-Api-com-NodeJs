import { Router } from "express"; 
import { router } from ".";

import { CreateUserController } from "../modules/accounts/userCases/createUser/CreateUserController";

const usersRoutes = Router();

const createUserController = new CreateUserController()

usersRoutes.use("/", createUserController.handle);

export { usersRoutes };