import db from "./models";
import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import path from "path";
import cors from "cors";

import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "./swagger.json";

import EmailManagment from "./utils/sendgrid";

import UserRepository from "./repositories/user-repository";
import userService from "./services/user-service";
import userController from "./controllers/user-controller";
import userRoutes from "./routes/user-routes";

import VehicleRepository from "./repositories/vehicle-repository";
import vehicleService from "./services/vehicle-service";
import vehicleController from "./controllers/vehicle-controller";
import vehicleRoutes from "./routes/vehicle-routes";

import AdRepository from "./repositories/ad-repository";
import adService from "./services/ad-service";
import adController from "./controllers/ad-controller";
import adRoutes from "./routes/ad-routes";

const app = express();

app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(
  "/users",
  userRoutes(
    express,
    userController(userService(new UserRepository(), new EmailManagment()))
  )
);

app.use(
  "/vehicles",
  vehicleRoutes(
    express,
    vehicleController(vehicleService(new VehicleRepository()))
  )
);

app.use(
  "/ads",
  adRoutes(
    express,
    adController(adService(new VehicleRepository(), new AdRepository()))
  )
);

const port = process.env.PORT || 3000;

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`App listen on port ${port}`);
  });
});
