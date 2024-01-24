import { RequestArticle } from "../models/requestArticle.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asynHandler.js";

const requestArticle = asyncHandler(async (req, res) => {
  const { fullName, seniorName, companyName ,contactInfo, note } = req.body;

  if (
    [fullName, seniorName, companyName, contactInfo, note].some(
      field => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const requestArticle = await RequestArticle.create({
    fullName,
    seniorName,
    companyName,
    contactInfo,
    note,
  });

  return res
    .status(200)
    .json(
      new ApiResponse(200, requestArticle, "Request Recieved Successfully")
    );
});

const getAllRequest = asyncHandler(async (req, res) => {
  const requests = await RequestArticle.find();

  if (!requests) {
    throw new ApiError(400, "Couldn't fetch Data! Try again");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, requests, "All Requests fetched"));
});

export { requestArticle, getAllRequest };
