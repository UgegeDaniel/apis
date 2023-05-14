"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const apiErrorType_1 = require("../types/apiErrorType");
const models_1 = require("../models");
const auth_1 = require("../middlewares/auth");
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
const authService = {
    signUp: async (userToSignUp) => {
        const { name, email, password } = userToSignUp;
        const hashedPassword = await hashPassword(password);
        const user = await models_1.UserModel.createUser({
            name,
            email,
            password: hashedPassword,
        });
        const token = (0, auth_1.createToken)({ userId: user?.users_uid, role: 'Student' });
        return { user, token };
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
