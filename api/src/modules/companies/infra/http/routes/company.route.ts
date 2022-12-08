import CreateCompanyController from "@/modules/companies/use-cases/create-company/create-company-controller";
import ShowCompanyController from "@/modules/companies/use-cases/show-company/show-company-controller";
import SoftDeleteCompanyController from "@/modules/companies/use-cases/soft-delete-company/soft-delete-company-controller";
import UpdateCompanyController from "@/modules/companies/use-cases/update-company/update-user-controller";
import ensureAuthentication from "@/shared/infra/http/middlewares/ensureAuthentication";
import { celebrate, Segments, Joi } from "celebrate";
import { Router } from "express";

const companyRoutes = Router();

companyRoutes.use(ensureAuthentication);

const createCompanyController = new CreateCompanyController();
const showCompanyController = new ShowCompanyController();
const updateCompanyController = new UpdateCompanyController();
const softDeleteCompanyController = new SoftDeleteCompanyController();

companyRoutes.post(
  "/",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      fancyName: Joi.string().required(),
      corporateName: Joi.string().required(),
    }),
  }),
  createCompanyController.handle
);

companyRoutes.get(
  "/:uuid",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      uuid: Joi.string().uuid(),
    }),
  }),
  showCompanyController.handle
);

companyRoutes.put(
  "/:uuid",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      uuid: Joi.string().uuid(),
    }),
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string(),
      corporateName: Joi.string(),
      fancyName: Joi.string(),
    }),
  }),
  updateCompanyController.handle
);

companyRoutes.delete(
  "/:uuid?",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      uuid: Joi.string().uuid(),
    }),
  }),
  softDeleteCompanyController.handle
);

export { companyRoutes };
