"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const dbInit_1 = __importDefault(require("./config/dbInit"));
const schemas_1 = __importDefault(require("./schemas"));
const dbInstance_1 = __importDefault(require("./config/dbInstance"));
const logger_1 = __importDefault(require("./logger"));
require('dotenv').config();
// CONSTANTS
const PORT = Number(process.env.PORT) || 5000;
const app = (0, express_1.default)();
const dbInstance = new dbInstance_1.default(schemas_1.default);
// GLOBAL MIDDLEWARES
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// ROUTES
app.use('/api', routes_1.default);
app.get('/', (req, res) => {
    res.status(200).json({ success: true, msg: 'Base Route' });
});
app.all('*', (req, res) => {
    res.status(404).json({ success: false, msg: 'invalid request endpoint' });
});
app.use(errorHandler_1.default);
app.listen(PORT, async () => {
    await (0, dbInit_1.default)(dbInstance, () => {
        logger_1.default.info(`SERVER RUNNING ON PORT: ${PORT}`);
    });
});
