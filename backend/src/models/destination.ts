import { InferSchemaType, Schema, model } from "mongoose";

const destinationSchema = new Schema({
    title: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    geolocation: { type: String, required: true },
    isPublic: { type: Boolean, required: true },
    username: { type: String, required: true },
    start_date: { type: Date },
    end_date: { type: Date },
});

type Destination = InferSchemaType<typeof destinationSchema>;

export default model<Destination>("Destination", destinationSchema);
