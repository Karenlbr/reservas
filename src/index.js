import express from "express";
import { userRouter } from "./routes/user.routes.js";
import { ApiRateLimit } from "./middleware/rate-limit.middleware.js";
import { reservationRouter } from "./routes/reserva.routes.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(ApiRateLimit);
app.use(cookieParser());
const port = 4100;

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Reservas",
  });
});

app.use("/usuarios", userRouter);
app.use("/reservas", reservationRouter);

app.listen(port, () => {
  console.log("Servidor iniciado");
});
