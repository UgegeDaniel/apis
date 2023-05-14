import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

const nameValidation = body('name')
  .isLength({ min: 5 })
  .withMessage('Name must be 5 chars long');

const fieldCheck = [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 5 })
    .withMessage('Password must be at least 5 chars long')
    .matches(/\d/)
    .withMessage('Password must contain a number'),
];

const validateMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errMsgs = errors.array().map((err) => err.msg);
    return res.status(400).json({ success: false, errors: errMsgs });
  }
  return next();
};

export const signUpValidators = [
  nameValidation,
  ...fieldCheck,
  validateMiddleware,
];
export const signInValidators = [...fieldCheck, validateMiddleware];
