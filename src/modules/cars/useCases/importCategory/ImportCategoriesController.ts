import { Request, Response } from "express";
import { container } from "tsyringe";

import { ImportCategoriesUseCase } from "./ImportCategoriesUseCase";

class ImportCategoriesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { file } = req;

    const importCategoriesUseCase = await container.resolve(ImportCategoriesUseCase);

    importCategoriesUseCase.execute(file);

    return res.status(201).send();
  }
}

export { ImportCategoriesController };
