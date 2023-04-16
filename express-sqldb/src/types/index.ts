import { Request } from 'express';

export interface TokenPayload {
  studentId: string;
  role: string;
}

interface RequestTypeExtension {
  studentId: string;
  role: string;
}

export type CustomRequest = Request & RequestTypeExtension;

export interface ErrorType {
  code: number;
  msg: string;
  status: number;
}
