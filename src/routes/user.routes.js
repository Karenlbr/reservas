import { Router } from "express";
import { getAllUser, userCreate } from "../controllers/user.controller.js";
import { login } from "../controllers/auth.controller.js";

export const userRouter = Router();

userRouter.get("/obtener-usuarios", getAllUser);
userRouter.post("/crear-usuario", userCreate);
userRouter.post("/login", login);
