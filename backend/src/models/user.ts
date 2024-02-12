import { InferSchemaType, Schema, model } from "mongoose";

const userSchema = new Schema({
    email: { type: String, required: true, unique: true, select: false },
    password: { type: String, required: true, unique: true, select: false },
    username: { type: String, required: true },
});

type User = InferSchemaType<typeof userSchema>;

export default model<User>("User", userSchema);
