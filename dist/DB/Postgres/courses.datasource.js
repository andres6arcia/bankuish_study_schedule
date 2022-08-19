"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const postgres_database_1 = require("./postgres.database");
const course_model_1 = __importDefault(require("./Models/course.model"));
class CoursesDatasource {
    constructor() {
        postgres_database_1.PostgresDataSource.initialize();
    }
    getAll(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield course_model_1.default.find({ where: { userId } });
        });
    }
    getById(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield course_model_1.default.findOne({ where: { desiredCourse: name } });
        });
    }
    create(course) {
        return __awaiter(this, void 0, void 0, function* () {
            const newCourse = new course_model_1.default();
            newCourse.desiredCourse = course.desiredCourse;
            newCourse.requiredCourse = course.requiredCourse;
            newCourse.userId = course.userId;
            return yield newCourse.save();
        });
    }
    update(course) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield course_model_1.default.findOne({ where: { desiredCourse: course.desiredCourse } });
            if (!response)
                return null;
            response.desiredCourse = course.desiredCourse;
            response.requiredCourse = course.requiredCourse;
            response.userId = course.userId;
            return yield (response === null || response === void 0 ? void 0 : response.save());
        });
    }
    delete(name) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield course_model_1.default.findOne({ where: { desiredCourse: name } });
            if (response)
                yield (response === null || response === void 0 ? void 0 : response.remove());
        });
    }
}
exports.default = CoursesDatasource;
