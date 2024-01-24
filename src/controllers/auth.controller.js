import { ACCESS_TOKEN_EXPIRY } from "../config/index.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asynHandler.js";

const register = asyncHandler(async (req, res) => {
  const { name, email, password, username } = req.body;
  const user = await User.create({ name, email, password, username });
  sendToken(user, 200, res);
});

const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }


  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }
  sendTokenResponse(user, 200, res);
});

const logout = asyncHandler(async (req, res, next) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json(new ApiResponse(200, {}, "Logged Out"));
});

const updatePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  if (!(await user.matchPassword(req.body.currentPassword))) {
    return next(new ApiError(401, "Password is incorrect"));
  }

  user.password = req.body.newPassword;
  await user.save();

  sendTokenResponse(user, 200, res);
});

const sendToken = (user, statusCode, res) => {
  const token = user?.getSignedJwtToken();
  const options = {
    expires: new Date(Date.now() + ACCESS_TOKEN_EXPIRY * 24 * 60 * 60 * 100),
    httpOnly: true,
    secure: true,
  };

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json(new ApiResponse(200, token, "Token Created"));
};

export { register, login, logout, updatePassword };
