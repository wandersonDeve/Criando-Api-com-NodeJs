import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";
import "reflect-metadata";

import { router } from "./routes";
import swaggerDocument from "./swagger.json";
import { AppError } from "./err/AppError";

import "./database";
import "./shared/container";

const app = express();

const port = 3333;

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  return res
    .status(500)
    .json({ message: `Internal Server Error - ${err.message}` });
});

app.listen(port, () => {
  console.info(`Server is running at http://localhost:${port}`);
});
