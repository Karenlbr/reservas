import express from "express";
import { reservationRouter } from "./routes/reservation.routes.js";
import { userRouter } from "./routes/user.routes.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cookieParser());
const port = 8080;

app.use("/reservas", reservationRouter);
app.use("/usuarios", userRouter);

app.get("/", (req, res) => {
  res.status(200).json("hola mundo");
});

app.listen(port, () => {
  console.log("Servidor iniciado");
});
