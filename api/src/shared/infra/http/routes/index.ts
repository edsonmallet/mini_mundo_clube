import { Router } from "express";

import { userRoutes } from "@/modules/users/infra/http/routes/user.route";

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
router.use("/api/v1/users", userRoutes);

export { router };
