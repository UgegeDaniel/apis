"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const questions_1 = __importDefault(require("./questions"));
const subjects_1 = __importDefault(require("./subjects"));
const users_1 = __importDefault(require("./users"));
const router = express_1.default.Router();
router.use('/questions', questions_1.default);
router.use('/subjects', subjects_1.default);
router.use('/users', users_1.default);
exports.default = router;
