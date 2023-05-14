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
    });
    return newUser;
  };

  findUser = async (email: string) => {
    const payload = await this.findBy({ email });
    const user = payload[0];
    if (!user) throw new ApiError(400, 'Invalid credentials');
    return user;
  };
}
export default BaseUserModel;
