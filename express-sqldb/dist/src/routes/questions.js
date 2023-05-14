"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const questionsController_1 = require("../controllers/questionsController");
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
router.use(auth_1.authMiddleware);
// METHOD: post
// ACCESS: admin
// DESCRIPTION: add new questions
router.post('/new', questionsController_1.addNewQuestions);
// METHOD: get
// ACCESS: authenticated user
// DESCRIPTION: get all available years for subjects
router.get('/availableyears', questionsController_1.getAvailableYears);
// METHOD: get
// ACCESS: authenticated user
// DESCRIPTION: get questions for a particular year and subject
router.get('/', questionsController_1.getQuestions);
exports.default = router;
