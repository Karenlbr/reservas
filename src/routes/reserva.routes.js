import { Router } from "express";
import { authenticateToken } from "../middleware/authentication.js";
import {
  createReservation,
  listReservations,
  updateReservation,
  deleteReservation,
} from "../controllers/reservation.controller.js";

export const reservationRouter = Router();

reservationRouter.use(authenticateToken);

reservationRouter.post("/crear-reserva", createReservation);
reservationRouter.get("/listar-reservas", listReservations);
reservationRouter.put("/actualizar-reserva/:id", updateReservation);
reservationRouter.delete("/eliminar-reserva/:id", deleteReservation);
