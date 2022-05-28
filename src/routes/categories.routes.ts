import { Router } from "express";

import { CreateCategoryService } from "../modules/cars/services/CreateCategoryService";
import { CategoriesRepository } from "../modules/cars/repositories/CategoriesRepository";

const categoriesRepository = new CategoriesRepository();

const categoriesRoutes = Router();

categoriesRoutes.post("/", (req, res) => {
  const { name, description } = req.body;

  const createCategoryService = new CreateCategoryService(categoriesRepository);

  createCategoryService.execute({ name, description });

  return res.status(201).send();
});

categoriesRoutes.get("/", (req, res) => {
  const all = categoriesRepository.list();

  return res.status(200).json({ all });
});

export { categoriesRoutes };
