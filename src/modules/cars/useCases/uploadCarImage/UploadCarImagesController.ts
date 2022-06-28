import { container } from "tsyringe";
import { Request, Response } from "express";
import { UploadCarImagesUseCase } from "./UploadCarImagesUseCase";

interface IFiles {
  filename: string;
}

class UploadCarImagesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const images = req.files as IFiles[];

    const uploadCarImagesUseCase = container.resolve(UploadCarImagesUseCase);

    const images_name = images.map((image) => image.filename);

    await uploadCarImagesUseCase.execute({
      car_id: id,
      images_name,
    });

    return res.status(201).json({ message: "Car images uploaded" });
  }
}

export { UploadCarImagesController };
