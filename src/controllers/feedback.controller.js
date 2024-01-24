import { Feedback } from "../models/feedback.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asynHandler.js";

export const postFeedback = asyncHandler(async (req, res, next) => {
  const feedback = await Feedback.create(req.body);
  return res
    .status(200)
    .json(new ApiResponse(200, feedback, "Feedback Recieved"));
});

export const getFeedbacks = asyncHandler(async (req, res, next) => {
  const feedbacks = await Feedback.find();
  return res
    .status(200)
    .json(new ApiResponse(200, feedbacks, "Feedback Fetched"));
});
