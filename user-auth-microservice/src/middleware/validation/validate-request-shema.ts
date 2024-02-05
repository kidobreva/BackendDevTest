import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

export function validateRequestSchema(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const errors = validationResult(req).array();
  if (!errors.length) return next();

  const error = errors[0].msg;
  res.status(400).json({ message: error });
}
