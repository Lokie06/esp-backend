import mongoose, { Schema } from "mongoose";

const feedbackSchema = Schema(
  {
    article: {
      type: Schema.Types.ObjectId,
      ref: "Article",
    },
    feedback: {
      type: String,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
  },
  { timestamps: true }
);

export const Feedback = mongoose.model("Feedback", feedbackSchema);
