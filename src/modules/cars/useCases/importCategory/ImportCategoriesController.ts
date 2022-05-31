import { Request, Response } from "express";

import { ImportCategoriesUseCase } from "./ImportCategoriesUseCase";

class ImportCategoriesController {
  constructor(private importCategoryUseCase: ImportCategoriesUseCase) {}

  handle(req: Request, res: Response): Response {
    const { file } = req;
    this.importCategoryUseCase.execute(file);

    return res.send();
  }
}

export { ImportCategoriesController };
