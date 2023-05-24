// import { createHash } from 'crypto';
import bcrypt from 'bcrypt';
import { ApiError } from '../types/apiErrorType';
import { ReferenceModel } from '../models';

const { parsed } = require('dotenv').config();

const refExpiration = parsed.REF_EXPIRATION! * 60000;
class Reference {
  public userId: string;

  private reference: Promise<string>;

  constructor(userId: string) {
    this.userId = userId;
    this.reference = this.hashId(userId);
  }

  private async hashId(userId: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(userId, salt);
    return hash;
  }

  public async getReference(): Promise<string> {
    return await this.reference;
  }
}

export default class ReferenceManager {
  constructor() {}

  public createReference = async (id: string): Promise<Reference> => {
    const newReference = new Reference(id);
    const reference = await newReference.getReference();
    const expiration = new Date().getTime() + refExpiration;
    await ReferenceModel.saveReference(id, reference, expiration);
    return newReference;
  };

  public updateReference = async (id: string): Promise<Reference> => {
    const newReference = new Reference(id);
    const reference = await newReference.getReference();
    const expiration = new Date().getTime() + refExpiration;
    await ReferenceModel.updateReference(id, reference, expiration);
    return newReference;
  };

  public async verifyReference(reference: string): Promise<string | null> {
    const searchRef = await ReferenceModel.getReference(reference);
    const foundInDb = await searchRef[0];
    const isExpired = foundInDb?.expiry_time - new Date().getTime() < 0;
    if (!foundInDb) {
      throw new ApiError(400, 'Invalid Reference');
    }
    if (foundInDb && isExpired) {
      throw new ApiError(400, 'Expired Reference');
    }
    if (foundInDb && !isExpired) {
      return await foundInDb.user_id;
    }
    throw new ApiError(400, 'Invalid Reference');
  }
}
