/* eslint-disable no-unused-vars */
import {
  Request, Application, NextFunction, Response,
} from 'express';

export interface ApplicationGeneric<T> extends Application {}

interface RequestTypeExtension {
  userId: string;
  role: string;
}
export type roleType = 'Student' | 'Tutor';

export type CustomRequest = Request & RequestTypeExtension;

export type Controller = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void | Response<any, Record<string, any>>>;

export type CustomController = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => Promise<void | Response<any, Record<string, any>>>;

export type ControllerWithRole = (
  role: roleType
) => (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void | Response<any, Record<string, any>>>;

export type CustomControllerWithRole = (
  role: roleType
) => (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => Promise<void | Response<any, Record<string, any>>>;
