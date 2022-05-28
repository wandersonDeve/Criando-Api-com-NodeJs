import express from "express";

import { router } from "./routes";

const app = express();

const port = 8000;

app.use(express.json());

app.use(router)

app.listen(port, () => {
  console.info(`Server is running at http://localhost:${port}`);
});
