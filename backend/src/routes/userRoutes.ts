import Router from "express";
import { registerUserHandler } from "../controller/userController";
import { validateRequestBody } from "../middlewares/validateResources";
import { registerUserSchema } from "../schema/userSchema";

const router = Router();

router.post(
  "/register",
  validateRequestBody(registerUserSchema),
  registerUserHandler
);

export default router;
