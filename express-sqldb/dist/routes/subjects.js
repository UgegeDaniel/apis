"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-unused-vars */
const express_1 = __importDefault(require("express"));
const subjectsController_1 = require("../controllers/subjectsController");
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
router.use(auth_1.authMiddleware);
// METHOD: get
// ACCESS: authenticated user
// DESCRIPTION: get all questions
router.get('/', subjectsController_1.getAllSubjects);
// METHOD: post
// ACCESS: admin
// DESCRIPTION: add new subjects
router.post('/new', subjectsController_1.addNewSubject);
exports.default = router;
