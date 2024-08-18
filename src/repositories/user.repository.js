import dbLocal from "db-local";
import crypto from "crypto";
import bcrypt from "bcrypt";

const { Schema } = new dbLocal({ path: "./db.json" });

const User = Schema("user", {
  _id: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
});

export class UserRepository {
  static async create({ username, password }) {
    console.log(username);
    if (typeof username !== "string") {
      throw new Error("El usuario es requerido");
    }
    if (typeof password !== "string") {
      throw new Error("La contraseña es requerida");
    }

    const existUser = User.findOne({ username });
    if (existUser) {
      throw new Error("El usuario ya existe");
    }

    const id = crypto.randomUUID();
    const hashPassword = bcrypt.hashSync(password, 10);

    const newUser = User.create({
      _id: id,
      username,
      password: hashPassword,
    }).save();
    return newUser;
  }

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
