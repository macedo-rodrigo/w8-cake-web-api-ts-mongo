import express from "express";
import cors from "cors";
import compression from "compression";
import { mongoConnect } from "./bd";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression);

const PORT = 8080;

app.use(
  cors({
    origin: `http://localhost:${PORT}`,
  })
);

app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
});
