/* eslint-disable no-unused-vars */
import { Request, Application } from 'express';

export interface ApplicationGeneric<T> extends Application {}

interface RequestTypeExtension {
  userId: string;
  role: string;
}
export type roleType = 'Student' | 'Tutor'

export type CustomRequest = Request & RequestTypeExtension;
