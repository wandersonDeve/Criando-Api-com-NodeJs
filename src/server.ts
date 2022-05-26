import express from "express";

const app = express();

const port = 8000;

app.use(express.json());

app.get("/", (req, res) => {
  return res.json({ message: "Server online" });
});

app.post("/courses", (req, res) => {
  const { name } = req.body;

  return res.json({ name });
});

app.listen(port, () => {
  console.info(`Server is running at http://localhost:${port}`);
});
