import dbLocal from "db-local";
const { Schema } = new dbLocal({ path: "./db.json" });

export const Reservation = Schema("reservation", {
  _id: { type: String, required: true },
  name: { type: String, required: true },
  place: { type: String, required: true },
  hour: { type: String, required: true },
  date: { type: String, required: true },
  duration: { type: Number, required: true },
  department: { type: String, required: true },
});
