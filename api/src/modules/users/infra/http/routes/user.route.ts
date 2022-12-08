import AuthenticateUserController from "@/modules/users/use-cases/authenticate-user/authenticate-user-controller";
import CreateUserController from "@/modules/users/use-cases/create-user/create-user-controller";
import GetAuthenticatedUserController from "@/modules/users/use-cases/get-authenticated-user/get-authenticated-user-controller";
import ShowUserController from "@/modules/users/use-cases/show-user/show-user-controller";
import SoftDeleteUserController from "@/modules/users/use-cases/soft-delete-user/soft-delete-user-controller";
import UpdateUserController from "@/modules/users/use-cases/update-user/update-user-controller";
import ensureAuthentication from "@/shared/infra/http/middlewares/ensureAuthentication";
import { celebrate, Segments, Joi } from "celebrate";

import { Router } from "express";

const sessionRoutes: Router = Router();

const authenticateUserController = new AuthenticateUserController();
sessionRoutes.post(
  "/",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  authenticateUserController.handle
);

sessionRoutes.use(ensureAuthentication);

const getAuthenticatedUserController = new GetAuthenticatedUserController();
sessionRoutes.get("/me", getAuthenticatedUserController.handle);

const userRoutes: Router = Router();
userRoutes.use(ensureAuthentication);

const createUserController = new CreateUserController();
userRoutes.post(
  "/",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      role: Joi.string().required(),
      email: Joi.string().email().allow(null, ""),
      password: Joi.string().allow(null, ""),
      registry: Joi.string().allow(null, ""),
      document: Joi.string().allow(null, ""),
    }),
  }),
  createUserController.handle
);

const showUserController = new ShowUserController();
userRoutes.get(
  "/:uuid?",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      uuid: Joi.string().uuid(),
    }),
  }),
  showUserController.handle
);

const updateUserController = new UpdateUserController();
userRoutes.put(
  "/:uuid?",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      uuid: Joi.string().uuid(),
    }),
    [Segments.BODY]: Joi.object().keys({
      firstName: Joi.string().allow(null, ""),
      lastName: Joi.string().allow(null, ""),
      role: Joi.string().allow(null, ""),
      email: Joi.string().email().allow(null, ""),
      password: Joi.string().allow(null, ""),
      registry: Joi.string().allow(null, ""),
      document: Joi.string().allow(null, ""),
      profileGroupUuid: Joi.string().allow(null, ""),
    }),
  }),
  updateUserController.handle
);

const softDeleteUserController = new SoftDeleteUserController();
userRoutes.delete(
  "/:uuid?",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      uuid: Joi.string().uuid(),
    }),
  }),
  softDeleteUserController.handle
);

export { userRoutes, sessionRoutes };
