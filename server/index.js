import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import mainRoutes from "./routes/mainRoutes.js";
import publicRoutes from "./routes/publicRoutes.js";
import { authorizationMiddleware } from "./middlewares/authorizationMiddleware.js";
import { authenticationMiddleware } from "./middlewares/authenticationMiddleware.js";
import { loggerMiddleware } from "./middlewares/loggerMiddleware.js";
dotenv.config();

const app = express();
const { PORT, MONGO_URI } = process.env;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(loggerMiddleware);
app.use("/api/user", publicRoutes);
app.use(authenticationMiddleware);

app.get("/admin/dashboard", authorizationMiddleware, (req, res) => {
  res.send("Welcome to admin dashboard of ecoImpact");
});

app.use("/api", mainRoutes);

app.get("/", (req, res) => {
  res.send("ecoImpact API is running...");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
