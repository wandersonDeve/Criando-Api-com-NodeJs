import { DataSource } from "typeorm";
import { Category } from "../modules/cars/entities/Category";
import { Specification } from "../modules/cars/entities/Specifications";

export const dataSource = new DataSource({
  type: "postgres",
  host: "database",
  port: 5432,
  username: "docker",
  password: "1234",
  database: "rentx",
  entities: [Category, Specification],
  migrations: ["src/database/migrations/*.ts"],
});

dataSource
  .initialize()
  .then(async () => {
    console.log("Initializing the database...");
  })
  .catch((err) => console.log(err));
