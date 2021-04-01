const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const { config } = require("dotenv");

config();
const app = express();

// routes
const postRouter = require("./routes/api/posts");
const userRouter = require("./routes/api/users");

app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/api/posts", postRouter);
app.use("/api/users", userRouter);

const PORT = process.env.PORT || 5000;
const DB_URL = process.env.CONNECTION_URL.replace(
  "PASSWORD",
  process.env.DB_PASSWORD
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
