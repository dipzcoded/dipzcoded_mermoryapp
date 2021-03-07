import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import { config as dotenv } from "dotenv";

dotenv();
const app: Application = express();

// routes
import postRouter from "./routes/api/posts";

app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/api/posts", postRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello to Memory API");
});

const PORT = process.env.PORT || 5000;
const DB_URL = process.env.CONNECTION_URL!.replace(
  "PASSWORD",
  process.env.DB_PASSWORD as string
);

// making connection to our database
mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server running on port : ${PORT}`);
    })
  )
  .catch((err) => process.exit(1));
// this allow us to not get errors in the console
