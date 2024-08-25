import { User } from "../models/user.model.js";

export class AuthRepository {
  static async login({ username, password }) {
    if (typeof username !== "string") {
      throw new Error("El nombre de usuario es requerido");
    }
    if (typeof password !== "string") {
      throw new Error("La contraseña es requerida");
    }

    const user = User.findOne({ username });
    if (!user) {
      throw new Error("Nombre de usuario o contraseña incorrectos");
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Nombre de usuario o contraseña incorrectos");
    }

    return {
      _id: user._id,
      username: user.username,
    };
  }
}
