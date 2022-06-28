import { Router } from "express";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";

const carsRouter = Router();

const createCarController = new CreateCarController();

carsRouter.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
);

export { carsRouter };
