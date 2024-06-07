import express, { Express, Request, Response } from "express";
import cors from "cors";
import urlrouter from "./routes/route";

const app: Express = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use("/", urlrouter);

app.listen(PORT, () => {
  console.log("Hi Server Started...", `${PORT}`);
});
