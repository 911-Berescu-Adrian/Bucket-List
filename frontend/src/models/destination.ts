import { Document, Schema } from "mongoose";

export interface Destination extends Document {
    _id: string;
    title: string;
    image: string;
    description: string;
    geolocation: string;
    isPublic: boolean;
    userId: Schema.Types.ObjectId;
    start_date?: string;
    end_date?: string;
}
