import { Router } from "express";
import { UserRepository } from "../repositories/user.repository.js";
import jwt from "jsonwebtoken";

export const userRouter = Router();

userRouter.post("/crear-usuario", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await UserRepository.create({ username, password });
    res.status(201).json({ message: "El usuario ha sido creado exitosamente" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Ha ocurrido el error", error: error.message });
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await UserRepository.login({ username, password });
    const token = jwt.sign(
      { id: user._id, username: user.username },
      "EsUnSecreto",
      {
        expiresIn: "1h",
      }
    );
    res.status(200).cookie("token", token).json({
      message: "Login Exitoso",
      data: token,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Ha ocurrido el error", error: error.message });
  }
});
