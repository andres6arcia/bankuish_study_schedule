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
const dependencies_utils_1 = __importDefault(require("../Utils/dependencies.utils"));
const courses_interactor_1 = __importDefault(require("../UseCases/courses.interactor"));
const configurations_1 = __importDefault(require("../../configurations"));
const courses_datasource_1 = __importDefault(require("../../DB/Postgres/courses.datasource"));
class CoursesInput {
    constructor() {
        this.dependencies = new dependencies_utils_1.default();
        // Register dependencies for CoursesInteractor class 
        this.dependencies.singleton('Settings', configurations_1.default);
        this.dependencies.register('CoursesOutput', courses_datasource_1.default);
        this.dependencies.register('CoursesInteractor', courses_interactor_1.default, ['Settings', 'CoursesOutput']);
        this.coursesInteractor = this.dependencies.get('CoursesInteractor');
    }
    addCourses(rawData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.coursesInteractor.addCourses(rawData);
        });
    }
    getCourses(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.coursesInteractor.getCourses(userId);
        });
    }
}
exports.default = new CoursesInput();
