import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import DestinationModel from "./models/destination";

const app = express();

app.get("/", async (req, res, next) => {
  try {
    const destinations = await DestinationModel.find().exec();
    res.status(200).json(destinations);
  } catch (error) {
    next(error);
  }
});

app.use((req, res, next) => {
  next(Error("Not found"));
});

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let message = "Unknown error";
  if (error instanceof Error) message = error.message;
  res.status(500).json({ error: message });
});

export default app;
