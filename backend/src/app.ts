import "dotenv/config";
import express from "express";
import DestinationModel from "./models/destination";

const app = express();

app.get("/", async (req, res) => {
  const destinations = await DestinationModel.find().exec();
  res.status(200).json(destinations);
});

export default app;
