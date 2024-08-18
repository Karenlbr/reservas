import dbLocal from "db-local";
import crypto from "crypto";

const { Schema } = new dbLocal({ path: "./db.json" });

const Reservation = Schema("reservation", {
  _id: { type: String, required: true },
  name: { type: String, required: true },
  place: { type: String, required: true },
  hour: { type: String, required: true },
  date: { type: String, required: true },
  duration: { type: Number, required: true },
  department: { type: String, required: true },
});

export class ReservationRepository {
  static async create({ name, place, hour, date, duration, department }) {
    if (typeof name !== "string") {
      throw new Error("El nombre es requerido");
    }
    if (typeof place !== "string") {
      throw new Error("El lugar es requerido");
    }
    if (typeof hour !== "string") {
      throw new Error("La hora es requerida");
    }
    if (typeof date !== "string") {
      throw new Error("La fecha es requerida");
    }
    if (typeof duration !== "number") {
      throw new Error("La duración es requerida");
    }
    if (typeof department !== "string") {
      throw new Error("El departamento es requerido");
    }

    const id = crypto.randomUUID();

    const newReservation = Reservation.create({
      _id: id,
      name,
      place,
      hour,
      date,
      duration,
      department,
    }).save();

    return newReservation;
  }
  static async findById(id) {
    if (typeof id !== "string") {
      throw new Error("El ID es requerido");
    }

    const reservation = Reservation.findOne({ _id: id });
    if (!reservation) {
      throw new Error("Reserva no encontrada");
    }

    return reservation;
  }

  static async findAll() {
    return Reservation.find();
  }

  static async update(id, updates) {
    if (typeof id !== "string") {
      throw new Error("El ID es requerido");
    }

    const reservation = Reservation.findOne({ _id: id });
    if (!reservation) {
      throw new Error("Reserva no encontrada");
    }

    Object.assign(reservation, updates);
    reservation.save();

    return reservation;
  }

  static async delete(id) {
    if (typeof id !== "string") {
      throw new Error("El ID es requerido");
    }

    const reservation = Reservation.findOne({ _id: id });
    if (!reservation) {
      throw new Error("Reserva no encontrada");
    }

    Reservation.delete({ _id: id });

    return { message: "Reserva eliminada con éxito" };
  }
}
