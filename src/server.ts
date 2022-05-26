import express from "express";

const app = express();

const port = 8000;

app.listen(port, () => {
  console.info(`Server is running at http://localhost:${port}`);
});
