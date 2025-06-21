import Router from "express";
import { validateRequestBody } from "../middlewares/validateResources";
import { LoginUserSchema } from "../schema/userSchema";
import verifyUser from "../middlewares/verifyUser";
import {
  logoutUserHandler,
  userLoginHandler,
  validateTokenHandler,
} from "../controller/authController";

const router = Router();

router.post("/login", validateRequestBody(LoginUserSchema), userLoginHandler);

router.get("/validate-token", verifyUser, validateTokenHandler);

router.post("/logout", verifyUser, logoutUserHandler);

export default router;
