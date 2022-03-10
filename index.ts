import db from "./models";
import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import path from "path";

import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "./swagger.json";

import UserRepository from "./repositories/user-respository";
import userService from "./services/user-service";
import userController from "./controllers/user-controller";
import userRoutes from "./routes/user-routes";
const userRepository = new UserRepository();

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(
  "/users",
  userRoutes(express, userController(userService(userRepository)))
);

const port = process.env.PORT || 3000;

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`App listen on port ${port}`);
  });
});
