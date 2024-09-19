
import express from "express"; 
import morgan from "morgan";
import cors from "cors";
import likeRouter from "./routes/likeme.routes.js";

const app = express();
app.use(morgan("dev"));

//Habilitar el middleware que analiza (parsea) las solicitudes HTTP con un cuerpo en formato JSON.
app.use(express.json());
app.use(cors());
app.use(likeRouter);

//Inicia el servidor
app.listen(
  3000,
  console.log("Server listening on port 3000 -  url: http://localhost:3000")
);