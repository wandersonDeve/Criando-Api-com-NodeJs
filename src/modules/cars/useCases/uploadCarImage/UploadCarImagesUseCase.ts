import { ICarImagesRepository } from "@modules/cars/repositories/ICarImagesRepository";
import { deleteFile } from "@utils/file";
import { injectable, inject } from "tsyringe";

interface IRequest {
  car_id: string;
  images_name: string[];
}

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject("CarImagesRepository")
    private carImagesRepository: ICarImagesRepository
  ) {}

  async execute({ car_id, images_name }: IRequest) {
    images_name.map(async (image) => {
      const car = await this.carImagesRepository.findByCarId(car_id);

      if (car.image_name) {
        await deleteFile(`./tmp/cars${car.image_name}`);
      }

      await this.carImagesRepository.create(car_id, image);
    });
  }
}

export { UploadCarImagesUseCase };
