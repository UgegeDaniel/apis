"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const apiErrorType_1 = require("../types/apiErrorType");
const models_1 = require("../models");
const auth_1 = require("../middlewares/auth");
const verifyEmail_1 = __importStar(require("./verifyEmail"));
const validatePassword = async (password, hashedPassword) => {
    const match = await bcrypt_1.default.compare(password, hashedPassword);
    if (!match)
        throw new apiErrorType_1.ApiError(400, 'Incorrect credentials');
    return match;
};
const hashPassword = async (password) => {
    const salt = await bcrypt_1.default.genSalt(10);
    const hash = await bcrypt_1.default.hash(password, salt);
    return hash;
};
const sendEmailToUser = async (userId, email, name) => {
    const userMailOptions = await (0, verifyEmail_1.mailOptions)(userId, email, name);
    return verifyEmail_1.default.sendMail(userMailOptions, (err) => {
        if (err) {
            throw new apiErrorType_1.ApiError(500, 'Error verrifying your email');
        }
    });
};
const authService = {
    signUp: async (userToSignUp) => {
        const { password } = userToSignUp;
        const hashedPassword = await hashPassword(password);
        const user = await models_1.UserModel.createUser({
            ...userToSignUp,
            password: hashedPassword,
        });
        sendEmailToUser(user?.users_uid, userToSignUp.email, userToSignUp.name);
        const token = (0, auth_1.createToken)({ userId: user?.users_uid, role: 'Student' });
        return { user, token };
    },
    verifyUserEmail: async (userId, ref) => {
        if (await validatePassword(userId, ref)) {
            const user = await models_1.UserModel.verifyEmail(userId);
            const token = (0, auth_1.createToken)({ userId, role: 'Student' });
            return { user, token };
        }
        throw new apiErrorType_1.ApiError(400, 'Email Vefication Failed');
    },
    signIn: async (userToSignIn) => {
        const { email, password } = userToSignIn;
        const user = await models_1.UserModel.findUser(email);
        await validatePassword(password, user.password);
        const token = (0, auth_1.createToken)({ userId: user?.users_uid, role: 'Student' });
        return { user, token };
    },
};
exports.default = authService;
