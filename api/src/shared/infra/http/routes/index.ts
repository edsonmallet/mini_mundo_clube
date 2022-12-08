import { Router } from "express";

import {
  userRoutes,
  sessionRoutes,
} from "@/modules/users/infra/http/routes/user.route";
import { companyRoutes } from "@/modules/companies/infra/http/routes/company.route";
import { profileGroupRoutes } from "@/modules/profiles/groups/infra/http/routes/profile-group.route";
import { profileAssessmentRoutes } from "@/modules/profiles/assessments/infra/http/routes/profile-assessment.route";
import { profileMetricRoutes } from "@/modules/profiles/metrics/infra/http/routes/profile-metric.route";
import { profilePdiRoutes } from "@/modules/profiles/pdi/infra/http/routes/profile-pdi.route";
import { profilePdgRoutes } from "@/modules/profiles/pdg/infra/http/routes/profile-pdg.route";
import { profileCampaignRoutes } from "@/modules/profiles/campaigns/infra/http/routes/profile-campaign.route";

const router = Router();

router.get("/", (_, response) => {
  response.status(200).json({ name: "API MiniMundoClube", version: "1.0.0" });
});

router.get("/health", (_, response) => {
  const healthcheck = {
    uptime: process.uptime(),
    message: "OK",
    timestamp: Date.now(),
  };
  try {
    response.send(healthcheck);
  } catch (error) {
    healthcheck.message = error;
    response.status(503).send();
  }
});

//------ Module Core --------
router.use("/api/v1/session", sessionRoutes);
router.use("/api/v1/users", userRoutes);
router.use("/api/v1/companies", companyRoutes);

export { router };
