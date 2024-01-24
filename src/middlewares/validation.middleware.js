import { ApiError } from "../utils/ApiError.js";

const ValidationMiddleware =
  (statusCode, errorMessage) => (error, doc, next) => {
    if (error.errors) {
      const validationErrors = Object.keys(error.errors).map(
        key => error.errors[key].message
      );
      throw new ApiError(statusCode, errorMessage, validationErrors);
    }

    next();
  };

export { ValidationMiddleware };
