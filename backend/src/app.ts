import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import DestinationsRoutes from "./routes/DestinationsRouter";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";
import cors from "cors";

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));

app.use(morgan("dev"));

app.use(express.json());

app.use("/api/destinations", DestinationsRoutes);

app.use((req, res, next) => {
  next(createHttpError(404, "Not found"));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let message = "Unknown error occured";
  let status = 500;
  if (isHttpError(error)) {
    status = error.status;
    message = error.message;
  }
  res.status(status).json({ error: message });
});

export default app;
