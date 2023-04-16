/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable consistent-return */
import { NextFunction, Request, Response } from 'express';
import pool from '../connectDB';
import querries from '../utils/querries';
import { createToken } from '../middlewares/auth';
import { hashPassword, validatePassword } from '../utils';

const { signupQuery, signinQuery, roleQuery } = querries;

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, password, name } = req.body;
  const hashedPassword = await hashPassword(password);
  try {
    const { rows } = await pool.query(signupQuery, [
      name,
      email,
      hashedPassword,
    ]);
    const { rows: roleRows } = await pool.query(roleQuery, [rows[0].role_id]);
    const token = createToken({
      studentId: rows[0].student_uid,
      role: roleRows[0].name,
    });
    return res
      .status(201)
      .json({ newStudent: rows[0], token, role: roleRows[0].name });
  } catch (error: any) {
    if (error?.code === '23505') {
      next({ code: 23505, msg: `User with email: '${email}' already exists` });
      return;
    }
    next({ code: error?.code, msg: error?.message });
  }
};

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, password } = req.body;
  try {
    const { rows } = await pool.query(signinQuery, [email]);
    if (!rows[0]) {
      next({ code: 404, msg: `User with email: "${email}" not found` });
    }
    const role = await pool.query(roleQuery, [rows[0].role_id]);
    const token = createToken({
      studentId: rows[0].student_uid,
      role: role.rows[0].name,
    });
    return (await validatePassword(password, rows[0].password))
      ? res
        .status(201)
        .json({ newStudent: rows[0], token, role: role.rows[0].name })
      : next({ code: 403, msg: 'Password incorrect' });
  } catch (error: any) {
    next({ code: 500, msg: error.message });
  }
};
