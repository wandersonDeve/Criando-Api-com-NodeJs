import { Router } from "express";
import { CategoryRepository } from "../repositories/CategoryRepository";

const categoriesRoutes = Router();
const categoryRepository = new CategoryRepository();

categoriesRoutes.post("/", (req, res) => {
  const { name, description } = req.body;

  categoryRepository.create({ name, description });

  return res.status(201).send();
});

export { categoriesRoutes };
