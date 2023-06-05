import BaseModel from './baseModel';
import { ApiError } from '../types/apiErrorType';
import { UserType } from '../types/queryTypes';
import { DbUserType } from '../types/tableTyes';
const { parsed } = require('dotenv').config();

class BaseUserModel extends BaseModel {
  constructor(tableName: string) {
    super(tableName);
    this.tableName = tableName;
  }

  createUser = async (user: UserType) => {
    const {
      name, email, password, role_id,
    } = user;
    const newUser = await this.insert({
      name,
      email,
      password,
      payment_ref: null,
      verified: false,
      role_id,
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

  findUser = async (param: {}): Promise<DbUserType> => {
    const payload: DbUserType[] = await this.innerJoin('roles', {
      secondaryColumn: 'role_id',
      columOnSecondaryTable: 'roles_uid',
      primaryColumn: Object.keys(param)[0],
      primaryValue: Object.values(param)[0] as string,
    });
    const user: DbUserType = payload[0];
    if (!user) throw new ApiError(400, 'Invalid credentials');
    return user;
  };

  getAllTutors = async () => {
    const allTutors = await this.findBy( {
      role_id: parsed.TUTOR,
    });
    return allTutors;
  };
}
export default BaseUserModel;
