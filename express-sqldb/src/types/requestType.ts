import { Request, Application } from 'express';

export interface ApplicationGeneric<T> extends Application {}

interface RequestTypeExtension {
  userId: string;
  role: string;
}

export type CustomRequest = Request & RequestTypeExtension;