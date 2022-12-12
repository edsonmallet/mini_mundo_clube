import CreateUserController from "@/modules/users/use-cases/create-user/create-user-controller";
import ShowUserController from "@/modules/users/use-cases/show-user/show-user-controller";
import { celebrate, Segments, Joi } from "celebrate";

import { Router } from "express";

const userRoutes: Router = Router();

const createUserController = new CreateUserController();
userRoutes.post(
  "/",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      document: Joi.string().required(),
      birthDate: Joi.string().required(),
      password: Joi.string().required(),
      email: Joi.string().email().required(),
      name: Joi.string().required(),
    }),
  }),
  createUserController.handle
);

const showUserController = new ShowUserController();
userRoutes.get(
  "/",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      document: Joi.string(),
      birthDate: Joi.string(),
    }),
  }),
  showUserController.handle
);

export { userRoutes };
