import { InferSchemaType, Schema, model } from "mongoose";

const destinationSchema = new Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  geolocation: { type: String, required: true },
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
});

type Destination = InferSchemaType<typeof destinationSchema>;

export default model<Destination>("Destination", destinationSchema);
