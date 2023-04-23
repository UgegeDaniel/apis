"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const questions_1 = __importDefault(require("./routes/questions"));
const users_1 = __importDefault(require("./routes/users"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
require('dotenv').config();
// CONSTANTS
const PORT = process.env.SERVER_PORT || 5000;
const app = (0, express_1.default)();
// GLOBAL MIDDLEWARES
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// ROUTES
app.use('/api/questions', questions_1.default);
app.use('/api/users', users_1.default);
app.get('/', (req, res) => {
    res.status(200).json({ success: true, msg: 'Base Route' });
});
app.all('*', (req, res) => {
    res.status(404).json({ success: false, msg: 'invalid request endpoint' });
});
app.use(errorHandler_1.default);
app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log('server running on port 5000');
});
