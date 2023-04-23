import { Request } from 'express';

export interface TokenPayload {
  userId: string;
  role: string;
}

interface RequestTypeExtension {
  userId: string;
  role: string;
}

export type CustomRequest = Request & RequestTypeExtension;

export interface ErrorType {
  code: number;
  msg: string;
  status: number;
}

export type User = {
  users_uid: string;
  email: string,
  name: string,
  password: string,
  role_id: string,
  roles_name: string
};

export type searchObj = {
  key?: string,
  value?: string,
  key2?: string,
  value2?: string
}

export type conditionType = {
  col1: string;
  col2: string;
  col3: string;
}

export type errorType = {
  code: number;
  detail: string
} | unknown;
