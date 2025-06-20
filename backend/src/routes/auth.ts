import Router from "express";
import { validateRequestBody } from "../middlewares/validateResources";
import { LoginUserSchema } from "../schema/userSchema";
import verifyUser from "../middlewares/verifyUser";
import {
  logoutUser,
  userLogin,
  validateToken,
} from "../controller/authController";

const router = Router();

router.post("/login", validateRequestBody(LoginUserSchema), userLogin);

router.get("/validate-token", verifyUser, validateToken);

router.post("/logout", verifyUser, logoutUser);

export default router;
