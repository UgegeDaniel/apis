/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable consistent-return */

import jwt, { Secret } from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { CustomRequest, TokenPayload } from '../types';

const secret: Secret = process.env.JWT_SECRET!;

export const createToken = (id: TokenPayload) => jwt.sign(id, secret, { expiresIn: '1d' });

export const authMiddleware = (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ msg: 'Token required' });
  const token = authorization.split(' ')[1];
  try {
    const { userId, role } = jwt.verify(token, secret) as TokenPayload;
    req.userId = userId;
    req.role = role;
    next();
    return;
  } catch (error) {
    return res.status(401).json({ msg: 'Invalid Token' });
  }
};
