import { Request, Response } from "express";

import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

class ListCategoriesController {
constructor(private readonly listCategoriesUseCase: ListCategoriesUseCase) {}

  handler(req: Request, res: Response): Response {
    const all = this.listCategoriesUseCase.execute();

    return res.json(all)
  }
}

export { ListCategoriesController };
