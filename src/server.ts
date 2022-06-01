import express from "express";
import swaggerUi from "swagger-ui-express";

import { router } from "./routes";
import swaggerDocument from "./swagger.json";

const app = express();

const port = 8000;

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(router);

app.listen(port, () => {
  console.info(`Server is running at http://localhost:${port}`);
});
