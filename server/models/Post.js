import mongoose, { Schema, ObjectId } from "mongoose";

export default mongoose.model(
  "Post",
  new Schema(
    {
      id: { type: ObjectId },
      title: {
        type: String,
        required: true,
        validate: {
          validator: (value) => value.length > 0,
          message: "Username sai length",
        },
      },
      content: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  )
);
