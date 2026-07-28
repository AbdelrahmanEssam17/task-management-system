import dbconeection from "./DB/db.connection.js";
import cors from "cors";
import { globalErrorhandling } from "./utils/response/error.response.js";
import userroute from "./modules/auth/auth.route.js";
import dotenv from "dotenv";
dotenv.config();
const bootstrap = (app, express) => {
  app.use(express.json());
  app.use(cors());

  app.use("/auth", userroute);

  app.all("/*splat", (req, res) => {
    res.status(404).json({
      message: "Not Found",
    });
  });

  app.use(globalErrorhandling);

  dbconeection();
};

export default bootstrap;
