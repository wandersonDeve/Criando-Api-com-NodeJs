import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

class ListAvailableCarsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { brand, name, category_id } = req.query;
    const listAvailableCarsUseCase = container.resolve(
      ListAvailableCarsUseCase
    );

    const availableCars = await listAvailableCarsUseCase.execute({
      category_id: category_id as string,
      name: name as string,
      brand: brand as string,
    });

    return res.status(200).json(availableCars);
  }
}

export { ListAvailableCarsController };
