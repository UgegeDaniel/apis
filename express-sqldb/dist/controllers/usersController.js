"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signIn = exports.signUp = void 0;
const auth_1 = require("../middlewares/auth");
const utils_1 = require("../utils");
const models_1 = require("../models");
const { parsed } = require('dotenv').config();
const getUserRoles = async (email) => {
    const options = { col1: 'role_id', col2: 'roles_uid', col3: 'name' };
    const { data } = await models_1.UserModel.innerJoin('roles', options);
    const payload = data.find((user) => user.email === email);
    return payload;
};
const signUp = async (req, res) => {
    const { email, password, name } = req.body;
    const hashedPassword = await (0, utils_1.hashPassword)(password);
    const { data: newUser, error: userError } = await models_1.UserModel.insert({
        name, email, password: hashedPassword, role_id: parsed.STUDENT_ROLE_ID,
    });
    const msg = userError?.code === '23505' ? 'User already exists' : userError?.detail;
    const payload = await getUserRoles(email);
    const token = (0, auth_1.createToken)({
        userId: newUser?.users_uid,
        role: newUser?.roles_name,
    });
    return !userError
        ? res.status(201).json({ success: true, payload, token })
        : res.status(406).json({
            sucess: false,
            msg,
        });
};
exports.signUp = signUp;
const signIn = async (req, res) => {
    const { email, password } = req.body;
    const param = {
        key: 'email',
        value: email?.toString(),
    };
    const { data, error } = await models_1.UserModel.findBy(param);
    const user = await getUserRoles(email);
    const validPassword = user && await (0, utils_1.validatePassword)(password, user.password);
    const token = (0, auth_1.createToken)({
        userId: user?.users_uid,
        role: user?.roles_name,
    });
    const msg = (data.length === 0 && 'User not found')
        || (!validPassword && 'Incorrect password')
        || error?.details;
    return data.length === 0 || error || !validPassword
        ? res.status(404).json({
            success: false,
            msg,
        })
        : res.status(200).json({ success: true, user, token });
};
exports.signIn = signIn;
