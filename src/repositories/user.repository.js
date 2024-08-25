import crypto from "crypto";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class UserRepository {
  static async create({ username, password }) {
    const id = crypto.randomUUID();
    const hashPassword = bcrypt.hashSync(password, 10);

    const newUser = User.create({
      _id: id,
      username,
      password: hashPassword,
    }).save();
    return newUser;
  }

  static async findUser(username) {
    const existUser = await User.findOne({ username });
    return existUser;
  }

  static async findAll() {
    return await User.find();
  }

  static async login({ username, password }) {
    const user = await User.findOne({ username });

    if (!user) {
      return { error: "Usuario y/o contraseña incorrecta" };
    }

    const isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch) {
      return { error: "Usuario y/o contraseña incorrecta" };
    }

    const token = jwt.sign(
      { _id: user._id, username: user.username },
      "bolivar.2024",
      { expiresIn: "1h" }
    );
    return { user, token };
  }
}
