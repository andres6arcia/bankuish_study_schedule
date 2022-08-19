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
Object.defineProperty(exports, "__esModule", { value: true });
class CoursesInteractor {
    constructor(configurations, coursesOutput) {
        this.configurations = configurations;
        this.coursesOutput = coursesOutput;
    }
    addCourses(rawData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Check if the structure of the raw data are correct
                let courses = [];
                if (!rawData.userId)
                    throw Error(this.configurations.CORE.MESSAGES.MISSING_USERID);
                if (!rawData.courses)
                    throw Error(this.configurations.CORE.MESSAGES.MISSING_COURSES);
                rawData.courses.map((rawCourse) => {
                    if (!rawCourse.desiredCourse)
                        throw Error(this.configurations.CORE.MESSAGES.MISSING_DESIRED_COURSE);
                    const course = Object.assign(Object.assign({}, rawCourse), { userId: rawData.userId });
                    courses.push(course);
                });
                // Save all courses sent
                let querys = [];
                for (let course of courses) {
                    querys.push(this.coursesOutput.create(course));
                }
                let response = yield Promise.all(querys);
                return { ok: true, message: this.configurations.CORE.MESSAGES.SAVE_OK, data: response };
            }
            catch (error) {
                throw Error(error.message);
            }
        });
    }
    getCourses(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!userId)
                    throw Error(this.configurations.CORE.MESSAGES.USER_NOT_FOUND);
                // Get all user courses and sort it 
                const courses = yield this.coursesOutput.getAll(userId);
                const sortedCourses = this.topoSort(courses, this.configurations);
                if (!courses.length)
                    return { ok: true, message: this.configurations.CORE.MESSAGES.USER_WITHOUT_COURSES, data: [] };
                // List all courses sorted starting with the required course of first element
                let list = [];
                if (sortedCourses[0].requiredCourse)
                    list.push(sortedCourses[0].requiredCourse);
                list = [...list, ...sortedCourses.map((x) => x.desiredCourse)];
                return { ok: true, message: this.configurations.CORE.MESSAGES.GET_OK, data: list };
            }
            catch (error) {
                throw Error(error.message);
            }
        });
    }
    topoSort(courses, configurations) {
        const visited = new Set;
        const courseMap = new Map(courses.map((course) => [course.desiredCourse, course]));
        function depthFirstSearch(courses) {
            for (let course of courses) {
                if (!visited.has(course.desiredCourse)) {
                    if (course.desiredCourse == course.requiredCourse)
                        throw Error(configurations.CORE.MESSAGES.CYCLE_COURSE_FOUND);
                    let resp = courseMap.get(course.requiredCourse);
                    depthFirstSearch(!resp ? [] : [resp]);
                }
                visited.add(course);
            }
        }
        depthFirstSearch(courses);
        return [...visited];
    }
}
exports.default = CoursesInteractor;
