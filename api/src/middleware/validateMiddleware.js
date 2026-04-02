import { validationResult } from "express-validator";

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorList = errors.array();
    return res.status(400).json({
      message: errorList[0]?.msg || "Validation failed",
      errors: errorList
    });
  }

  next();
};

export default validate;
