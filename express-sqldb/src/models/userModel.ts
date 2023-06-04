import BaseModel from './baseModel';
import { ApiError } from '../types/apiErrorType';
import { UserType } from '../types/queryTypes';

const { parsed } = require('dotenv').config();

class BaseUserModel extends BaseModel {
  constructor(tableName: string) {
    super(tableName);
    this.tableName = tableName;
  }

  createUser = async (user: UserType) => {
    const { name, email, password } = user;
    const newUser = await this.insert({
      name,
      email,
      password,
      role_id: parsed.STUDENT_ROLE_ID,
      payment_ref: null,
      verified: false,
    });
    if (!newUser) throw new ApiError(400, 'Invalid credentials');
    return newUser[0];
  };

  verifyEmail = async (userId: string) => {
    const verifiedUser = await this.updateTable(
      { users_uid: userId },
      {
        verified: true,
      },
    );
    return verifiedUser[0];
  };

  savePaymentRef = async (userId: string, payment_ref: string) => {
    const paidUser = await this.updateTable(
      { users_uid: userId },
      { payment_ref },
    );
    return paidUser[0];
  };

  findUser = async (param: {}) => {
    const payload = await this.findBy(param);
    const user = payload[0];
    if (!user) throw new ApiError(400, 'Invalid credentials');
    return user;
  };
}
export default BaseUserModel;
