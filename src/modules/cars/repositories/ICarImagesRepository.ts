import { CarImage } from "../infra/typeorm/entities/CarImage";

interface ICarImagesRepository {
  create(car_id: string, image_name: string): Promise<CarImage>;
  findByCarId(car_id: string): Promise<CarImage>;
}

export { ICarImagesRepository };
