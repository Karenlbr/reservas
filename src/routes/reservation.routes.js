import { authenticateToken } from "../middlware/authentication.js";
import { ReservationRepository } from "../repositories/reservation.repository.js";
import { Router } from "express";

export const reservationRouter = Router();
reservationRouter.use(authenticateToken);

reservationRouter.post("/crear-reserva", async (req, res) => {
  try {
    const { name, place, hour, date, duration, department } = req.body;
    if (!name || !place || !hour || !date || !duration || !department) {
      return res
        .status(400)
        .json({ message: "Todos los campos son requeridos" });
    }

    const reservation = await ReservationRepository.create({
      name,
      place,
      hour,
      date,
      duration,
      department,
    });
    res
      .status(201)
      .json({ message: "La reserva ha sido creada exitosamente", reservation });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Ha ocurrido un error", error: error.message });
  }
});

reservationRouter.get("/listar-reservas", async (req, res) => {
  try {
    const all = await ReservationRepository.findAll();
    res.status(200).json({
      message: "Se obtiene correctamente",
      data: all,
    });
  } catch (error) {}
});

reservationRouter.put("/actualizar-reserva/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;

    if (!id) {
      return res
        .status(400)
        .json({ message: "El ID de la reserva es requerido" });
    }

    const updatedReservation = await ReservationRepository.update(id, updates);

    res.status(200).json({
      message: "La reserva ha sido actualizada exitosamente",
      reservation: updatedReservation,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Ha ocurrido un error", error: error.message });
  }
});

reservationRouter.delete("/eliminar-reserva/:id", async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res
        .status(400)
        .json({ message: "El ID de la reserva es requerido" });
    }

    const result = await ReservationRepository.delete(id);

    res.status(200).json(result);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Ha ocurrido un error", error: error.message });
  }
});
