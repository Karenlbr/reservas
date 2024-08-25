import dbLocal from "db-local";

const { Schema } = new dbLocal({ path: "./db.json" });

export const User = Schema("user", {
  _id: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
});
