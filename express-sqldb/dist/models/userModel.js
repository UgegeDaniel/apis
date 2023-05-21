"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const baseModel_1 = __importDefault(require("./baseModel"));
const apiErrorType_1 = require("../types/apiErrorType");
const { parsed } = require('dotenv').config();
class BaseUserModel extends baseModel_1.default {
    constructor(tableName) {
        super(tableName);
        this.createUser = async (user) => {
            const { name, email, password } = user;
            const newUser = await this.insert({
                name,
                email,
                password,
                role_id: parsed.STUDENT_ROLE_ID,
                verified: false,
            });
            return newUser[0];
        };
        this.verifyEmail = async (userId) => {
            const verifiedUser = await this.updateTable(userId, {
                verified: true,
            });
            return verifiedUser[0];
        };
        this.findUser = async (email) => {
            const payload = await this.findBy({ email });
            const user = payload[0];
            if (!user)
                throw new apiErrorType_1.ApiError(400, 'Invalid credentials');
            return user;
        };
        this.tableName = tableName;
    }
}
exports.default = BaseUserModel;
