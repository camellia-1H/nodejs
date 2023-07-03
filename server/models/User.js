import mongoose, { Schema, ObjectId } from "mongoose";
import isEmail from "validator/lib/isEmail.js";

export default mongoose.model(
  "User",
  new Schema({
    id: { type: ObjectId },
    name: {
      type: String,
      required: true,
      validate: {
        validator: (value) => value.length > 3,
        message: "Username sai length",
      },
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: (value) => isEmail,
        message: "Email sai",
      },
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
    },
    // refreshToken: [String],
  })
);
