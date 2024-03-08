import { Article } from "../models/article.model.js";
import { asyncHandler } from "../utils/asynHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import axios from "axios";
import { ApiError } from "../utils/ApiError.js";
import { mailReceived } from "./mail.controller.js";

const postArticle = asyncHandler(async (req, res) => {
  const {
    title,
    companyName,
    fullName,
    showName,
    description,
    tags,
    email,
    userImage,
  } = req.body;

  const response = await axios.get(
    `https://autocomplete.clearbit.com/v1/companies/suggest?query=${companyName}`
  );

  let companyDomainName;
  if (response?.data?.length === 0) {
    companyDomainName =
      "https://cdn.pixabay.com/photo/2014/04/02/17/03/globe-307805_960_720.png";
  } else {
    companyDomainName = response.data[0].logo;
  }

  const article = await Article.create({
    title,
    companyName,
    companyDomainName,
    fullName,
    showName,
    description,
    tags,
    email,
    userImage,
  });

  // Verification
  const mailResponse = await mailReceived(email, fullName, title);

  if (!mailResponse) {
    throw new ApiError(500, "Error sending verification email");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, article, "Article Sent For Verification"));
});

const getAllArticles = asyncHandler(async (req, res) => {
  const articles = await Article.find({ isVerified: true })
    .sort({ _id: -1 })
    .limit(10);
    return res
      .status(200)
      .json(new ApiResponse(200, articles, "All Articles Fetched"));
});

const getSingleArticle = asyncHandler(async (req, res) => {
  const article = await Article.find({
    _id: req.params.articleId,
    isVerified: true,
  }).select("-__v -companyDomainName -updatedAt -isVerified");

  if (article.length === 0) {
    throw new ApiError(400, `No article with found !!`);
  }
    return res
      .status(200)
      .json(new ApiResponse(200, article, "Read Full Article!!"));
});

const getArticleByTags = asyncHandler(async (req, res) => {
  const tag = req.body.tags;
  const article = await Article.find({
    $and: [{ isVerified: true }, { tags: { $in: tag } }],
  });

  if (!article || article.length === 0) {
    throw new ApiError(400, `No article with found By Tags!!`);
  }

  return res
    .status(200)
    .json(new ApiResponse(200, article, "Article Found by Tags!!"));
});

export { postArticle, getAllArticles, getSingleArticle, getArticleByTags };
