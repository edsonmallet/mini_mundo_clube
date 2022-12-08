import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import { router } from "./routes";
import cors from "cors";
import AppError from "@/shared/errors/app-error";
import { isCelebrateError } from "celebrate";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    console.log(err);
    if (isCelebrateError(err)) {
      const validation = {};
      let i = 0;
      for (const [segment, joiError] of err.details.entries()) {
        validation[segment] = {
          message: joiError.message,
          field: joiError.details[i].path[0],
        };
        i++;
      }
      return response.status(400).json({
        status: "error-validation",
        validation,
      });
    }
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: "error",
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "error-internal",
      message: err.message,
    });
  }
);

export { app };
