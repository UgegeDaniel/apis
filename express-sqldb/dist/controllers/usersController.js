"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveStudentScore = exports.getStudentScore = exports.signIn = exports.signUp = void 0;
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
// const getUserHistory = async (email: string) => {
//   const options = { col1: 'users_uid', col2: 'scores_uid', col3: 'name' };
//   const { data } = await UserModel.innerJoin('scores', options);
//   const payload = data.find((user: User) => user.email === email);
//   return payload;
// };
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
            success: false,
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
const getStudentScore = async (req, res) => {
    const { userId } = req;
    const { data, error } = await models_1.ScoresModel.findBy({
        key: 'user_id',
        value: userId,
    });
    return error
        ? res.status(404).json({ success: false, msg: 'User History not found' })
        : res.status(200).json({ success: true, userHistory: data });
};
exports.getStudentScore = getStudentScore;
const saveStudentScore = async (req, res) => {
    const { subject, score } = req.body;
    const { userId } = req;
    const timeOfTest = Date.now();
    const { data } = await models_1.SubjectModel.findBy({ key: 'name', value: subject });
    const subjectId = data?.find((item) => item.name === subject).subjects_uid;
    if (!subjectId)
        return res.status(404).json({ success: false, msg: 'Subject not found' });
    const itemsToInsert = {
        time_of_test: timeOfTest,
        user_id: userId,
        subject_id: subjectId,
        score,
    };
    const { data: scoresData, error } = await models_1.ScoresModel.insert(itemsToInsert, false);
    return error
        ? res.status(500).json({ success: false, msg: 'Something went wrong' })
        : res.status(201).json({ success: true, scoresData });
};
exports.saveStudentScore = saveStudentScore;
