import { UserRepository } from "../repositories/user.repository.js";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await UserRepository.login({ username, password });
    const token = jwt.sign(
      { id: user._id, username: user.username },
      "bolivar.2024",
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
};
