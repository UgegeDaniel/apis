import { Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import { ApiError } from '../types/apiErrorType';
import { CustomRequest } from '../types/requestType';
import { TokenPayload } from '../types/tokenPayloadType';

const { parsed } = require('dotenv').config();

const secret: Secret = parsed.JWT_SECRET!;
export const createToken = (id: TokenPayload) => jwt.sign(id, secret, { expiresIn: '1d' });

export const authMiddleware = (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const { authorization } = req.headers;
  if (!authorization) throw new ApiError(401, 'Token required');
  const token = authorization.split(' ')[1];
  try {
    const { userId, role } = jwt.verify(token, secret) as TokenPayload;
    req.userId = userId;
    req.role = role;
    return next();
  } catch (error) {
    throw new ApiError(401, 'Invalid Token');
  }
};
