import app from "./app";
import mongoose from "mongoose";

const port = process.env.PORT;

if (!port) {
  throw new Error("Port missing");
}

if (!process.env.MONGO_CONNECTION_STRING) {
  throw new Error("MongoDB connection string missing");
}

mongoose
  .connect(process.env.MONGO_CONNECTION_STRING)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server started at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
