const notFound = (req, res, next) => {
  const error = new Error(`Not found: ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  let message = err.message;

  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors).map((item) => item.message).join(", ");
  } else if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid ${err.path}: ${err.value}`;
  } else if (err.code === 11000) {
    statusCode = 400;
    const duplicateField = Object.keys(err.keyPattern || err.keyValue || {})[0] || "field";
    message = `${duplicateField} must be unique`;
  }

  if (process.env.NODE_ENV !== "production") {
    console.error(err);
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack
  });
};

export { notFound, errorHandler };
