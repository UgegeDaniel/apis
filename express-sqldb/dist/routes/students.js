"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
const express_1 = __importDefault(require("express"));
const studentsController_1 = require("../controllers/studentsController");
const validation_1 = require("../middlewares/validation");
const router = express_1.default.Router();
// METHOD: post
// ACCESS: public
// DESCRIPTION: sign up new students
router.post('/signup', validation_1.signUpValidators, studentsController_1.signUp);
// METHOD: post
// ACCESS: public
// DESCRIPTION: sign in students
router.post('/signin', validation_1.signInValidators, studentsController_1.signIn);
exports.default = router;
