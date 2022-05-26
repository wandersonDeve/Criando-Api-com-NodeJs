import express from "express";
import { categoriesRoutes } from "./routes/categories.routes";
const app = express();

const port = 8000;

app.use(express.json());

app.use(categoriesRoutes);

app.listen(port, () => {
  console.info(`Server is running at http://localhost:${port}`);
});
