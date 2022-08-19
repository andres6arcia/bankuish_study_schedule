"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresDataSource = void 0;
const typeorm_1 = require("typeorm");
const configurations_1 = __importDefault(require("../../configurations"));
const course_model_1 = __importDefault(require("./Models/course.model"));
exports.PostgresDataSource = new typeorm_1.DataSource({
    type: configurations_1.default.DB.POSTGRES.TYPE,
    logging: configurations_1.default.DB.POSTGRES.LOGGING,
    url: configurations_1.default.DB.POSTGRES.URL,
    entities: [course_model_1.default],
    synchronize: configurations_1.default.DB.POSTGRES.SYNCHRONIZE
});
