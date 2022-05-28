import { Router } from "express";

import { CreateCategoryService } from "../services/CreateCategoryService";
import { PostgresCategoriesRepository } from "../repositories/PostgresCategoriesRepository";

const categoriesRoutes = Router();
const categoriesRepository = new PostgresCategoriesRepository();

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
