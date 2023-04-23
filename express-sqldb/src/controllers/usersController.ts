/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable consistent-return */
import { Request, Response } from 'express';
import { createToken } from '../middlewares/auth';
import { hashPassword, validatePassword } from '../utils';
import { UserModel } from '../models';
import { User } from '../types';

const { parsed } = require('dotenv').config();

const getUserRole = async (email: string) => {
  const { data } = await UserModel.innerJoin('roles', { col1: 'role_id', col2: 'roles_uid', col3: 'name' });
  const payload = data.find((user: User) => user.email === email);
  return payload;
};

export const signUp = async (
  req: Request,
  res: Response,
) => {
  const { email, password, name } = req.body;
  const hashedPassword = await hashPassword(password);
  const { data: newUser, error: userError } = await UserModel.insert({
    name, email, password: hashedPassword, role_id: parsed.STUDENT_ROLE_ID,
  });
  const msg = userError?.code === '23505' ? 'User already exists' : userError?.detail;
  const payload = await getUserRole(email);
  const token = createToken({
    userId: newUser?.users_uid,
    role: newUser?.roles_name,
  });
  return !userError
    ? res.status(201).json({ payload, token })
    : res.status(500).json({
      code: userError.code,
      msg,
    });
};

export const signIn = async (
  req: Request,
  res: Response,
) => {
  const { email, password } = req.body;
  const param = {
    key: 'email',
    value: email?.toString(),
  };
  const { data, error } = await UserModel.findBy(param);
  const user = await getUserRole(email);
  const validPassword = user && await validatePassword(password, user.password);
  const token = createToken({
    userId: user?.users_uid,
    role: user?.roles_name,
  });
  return data.length === 0 || error || !validPassword
    ? res.status(404).json({
      success: false,
      code: 404 || error.code,
      msg: (data.length === 0 && 'User not found')
      || (!validPassword && 'Incorrect password')
      || error.details,
    })
    : res.status(200).json({ user, token });
};
