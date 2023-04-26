"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
const express_1 = __importDefault(require("express"));
const usersController_1 = require("../controllers/usersController");
const validation_1 = require("../middlewares/validation");
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
// METHOD: post
// ACCESS: public
// DESCRIPTION: sign up new users
router.post('/signup', validation_1.signUpValidators, usersController_1.signUp);
// METHOD: post
// ACCESS: public
// DESCRIPTION: sign in users
router.post('/signin', validation_1.signInValidators, usersController_1.signIn);
// METHOD: get
// ACCESS: Student
// DESCRIPTION: Get student scores
router.get('/score', auth_1.authMiddleware, usersController_1.getStudentScore);
// METHOD: post
// ACCESS: Student
// DESCRIPTION: Save Student scores
router.post('/score/save', auth_1.authMiddleware, usersController_1.saveStudentScore);
exports.default = router;
