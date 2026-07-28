import dbconeection from "./DB/db.connection.js";
import cors from "cors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import dotenv from "dotenv";
import { globalErrorhandling } from "./utils/response/error.response.js";
import userroute from "./modules/auth/auth.route.js";

dotenv.config();

const limiter = rateLimit({
  windowMs: 20 * 60 * 1000,
  max: 100, //
  message: {
    success: false,
    message: "Too many requests, please try again later",
  },
});

const bootstrap = (app, express) => {
  app.use(express.json());
  app.use(helmet());
  app.use(cors());
  app.use(limiter);
  app.use("/auth", userroute);

  app.all("/*splat", (req, res) => {
    res.status(404).json({
      success: false,
      message: "Not Found",
    });
  });
  app.use(globalErrorhandling);

  dbconeection();
};
export default bootstrap;
