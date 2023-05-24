import BaseModel from './baseModel';

class BaseReferenceModel extends BaseModel {
  constructor(tableName: string) {
    super(tableName);
    this.tableName = tableName;
  }

  saveReference = async (userId: string, ref: string, time: number) => {
    await this.insert({
      user_Id: userId,
      verification_ref: ref,
      expiry_time: time,
    });
  };

  getReference = async (ref: string) => await this.findBy({ verification_ref: ref });

  updateReference = async (userId: string, ref: string, time: number) => {
    await this.updateTable(
      { user_Id: userId },
      { verification_ref: ref, expiry_time: time },
    );
  };

  deleteRefernce = async (userId: string) => {
    await this.deleteRowFromTable({ user_Id: userId });
  };
}
export default BaseReferenceModel;
