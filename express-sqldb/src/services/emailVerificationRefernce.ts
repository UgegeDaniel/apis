import { createHash } from 'crypto';
import { ApiError } from '../types/apiErrorType';

class Reference {
  private id: string;

  private reference: string;

  private expiresAt: Date;

  constructor(id: string, expiresInMinutes: number) {
    this.id = id;
    this.reference = this.hashId(id);
    this.expiresAt = new Date();
    this.expiresAt.setMinutes(this.expiresAt.getSeconds() + expiresInMinutes);
  }

  private hashId(id: string): string {
    const hash = createHash('sha256');
    hash.update(id);
    return hash.digest('hex');
  }

  public getId(): string {
    return this.id;
  }

  public getReference(): string {
    return this.reference;
  }

  public hasExpired(): boolean {
    return new Date() >= this.expiresAt;
  }
}

export default class ReferenceManager {
  private references: Reference[];

  constructor() {
    this.references = [];
  }

  public createReference(id: string, expiresInMinutes: number): Reference {
    const reference = new Reference(id, expiresInMinutes);
    this.references.push(reference);
    return reference;
  }

  public verifyReference(reference: string): string | null {
    const foundReference = this.references.find(
      (ref) => ref.getReference() === reference,
    );
    if (foundReference?.hasExpired() === undefined) {
      throw new ApiError(400, 'Invalid Refernce');
    }
    if (foundReference) {
      return foundReference.getId();
    }

    return null;
  }
}
