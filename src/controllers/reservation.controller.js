import { ReservationRepository } from "../repositories/reservacion.repository.js";

export const createReservation = async (req, res) => {
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
};

export const listReservations = async (req, res) => {
  try {
    const all = await ReservationRepository.findAll();
    res.status(200).json({
      message: "Se obtiene correctamente",
      data: all,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Ha ocurrido un error", error: error.message });
  }
};

export const updateReservation = async (req, res) => {
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
};

export const deleteReservation = async (req, res) => {
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
};
