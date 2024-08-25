import { UserRepository } from "../repositories/user.repository.js";
import redis from "../config/redis.js";

export const userCreate = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "El nombre de usuario y la contraseña son requeridos",
      });
    }

    const user = await UserRepository.findUser(username);
    if (user) {
      return res.status(400).json({
        message: "El usuario ya existe",
      });
    }

    const newUser = await UserRepository.create({ username, password });

    return res.status(200).json({
      message: "Usuario creado correctamente",
      data: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const usersKey = "users";
    let cachedResponse = await redis.get(usersKey);
    if (cachedResponse) {
      cachedResponse = JSON.parse(cachedResponse);
      return res.status(200).json({
        data: cachedResponse,
      });
    }
    const users = await UserRepository.findAll();

    if (users.length > 0) {
      await redis.set(usersKey, JSON.stringify(users), "EX", 60);
      return res.status(200).json({
        message: "Se obtiene usuarios exitosamente",
        data: users,
      });
    } else {
      return res.status(400).json({
        message: "No hay usuarios en la base de datos",
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
