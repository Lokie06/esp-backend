import { ApiError } from "../utils/ApiError.js";

const errHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    const { statusCode, message, errors } = err;
    res.status(statusCode).json({
      status: "error",
      statusCode,
      message,
      errors,
    });
  } else {
    console.log(err)
    res.status(500).json({
      status: "error",
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
};

export { errHandler };


