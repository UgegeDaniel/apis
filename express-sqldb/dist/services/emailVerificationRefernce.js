"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const apiErrorType_1 = require("../types/apiErrorType");
class Reference {
    constructor(id, expiresInMinutes) {
        this.id = id;
        this.reference = this.hashId(id);
        this.expiresAt = new Date();
        this.expiresAt.setMinutes(this.expiresAt.getSeconds() + expiresInMinutes);
    }
    hashId(id) {
        const hash = (0, crypto_1.createHash)('sha256');
        hash.update(id);
        return hash.digest('hex');
    }
    getId() {
        return this.id;
    }
    getReference() {
        return this.reference;
    }
    hasExpired() {
        return new Date() >= this.expiresAt;
    }
}
class ReferenceManager {
    constructor() {
        this.references = [];
    }
    createReference(id, expiresInMinutes) {
        const reference = new Reference(id, expiresInMinutes);
        this.references.push(reference);
        return reference;
    }
    verifyReference(reference) {
        const foundReference = this.references.find((ref) => ref.getReference() === reference);
        if (foundReference?.hasExpired() === undefined) {
            throw new apiErrorType_1.ApiError(400, 'Invalid Refernce');
        }
        if (foundReference) {
            return foundReference.getId();
        }
        return null;
    }
}
exports.default = ReferenceManager;
