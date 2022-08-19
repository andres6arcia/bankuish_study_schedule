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
const configurations_1 = __importDefault(require("../../configurations"));
const chai_1 = __importDefault(require("chai"));
const courses_interactor_1 = __importDefault(require("./courses.interactor"));
const dependencies_utils_1 = __importDefault(require("../Utils/dependencies.utils"));
const courses_datasource_1 = __importDefault(require("../../DB/Postgres/courses.datasource"));
const expect = chai_1.default.expect;
// Register dependencies for CoursesInteractor class 
const dependencies = new dependencies_utils_1.default();
dependencies.singleton('Settings', configurations_1.default);
dependencies.register('CoursesOutput', courses_datasource_1.default);
dependencies.register('CoursesInteractor', courses_interactor_1.default, ['Settings', 'CoursesOutput']);
const coursesInteractor = dependencies.get('CoursesInteractor');
describe('Courses interactor method addCourses', () => {
    it('addCourses works fine with test data', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield coursesInteractor.addCourses(configurations_1.default.TEST.TEST_DATA);
        expect(response.ok).to.equal(true);
    }));
    it('Return the list of courses sent', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield coursesInteractor.addCourses(configurations_1.default.TEST.TEST_DATA);
        expect(response.data[0].desiredCourse).to.equal(configurations_1.default.TEST.TEST_DATA.courses[0].desiredCourse);
    }));
    it('Return error if userId were not found', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const testData = { userId: '', courses: configurations_1.default.TEST.TEST_DATA.courses };
            const response = yield coursesInteractor.addCourses(testData);
            throw new Error(configurations_1.default.TEST.MUST_RETURN_ERROR);
        }
        catch (error) {
            expect(error.message).to.equal(configurations_1.default.CORE.MESSAGES.MISSING_USERID);
        }
    }));
    it('Return error if courses were not found', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const testData = { userId: configurations_1.default.TEST.TEST_DATA.userId };
            const response = yield coursesInteractor.addCourses(testData);
            throw new Error(configurations_1.default.TEST.MUST_RETURN_ERROR);
        }
        catch (error) {
            expect(error.message).to.equal(configurations_1.default.CORE.MESSAGES.MISSING_COURSES);
        }
    }));
    it('Return error if desiredCourse were not found on all courses', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let testData = structuredClone(configurations_1.default.TEST.TEST_DATA);
            testData.courses[0].desiredCourse = '';
            const response = yield coursesInteractor.addCourses(testData);
            throw new Error(configurations_1.default.TEST.MUST_RETURN_ERROR);
        }
        catch (error) {
            expect(error.message).to.equal(configurations_1.default.CORE.MESSAGES.MISSING_DESIRED_COURSE);
        }
    }));
});
describe('Courses interactor method getCourses', () => {
    it('Works fine with test data', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield coursesInteractor.getCourses(configurations_1.default.TEST.USER);
        expect(response.ok).to.equal(true);
    }));
    it('Works fine with non existing userId', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield coursesInteractor.getCourses(configurations_1.default.TEST.NON_EXISTING_USER);
        expect(response.ok).to.equal(true);
        expect(response.message).to.equal(configurations_1.default.CORE.MESSAGES.USER_WITHOUT_COURSES);
    }));
    it('Works fine without userId', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield coursesInteractor.getCourses();
            throw new Error(configurations_1.default.TEST.MUST_RETURN_ERROR);
        }
        catch (error) {
            expect(error.message).to.equal(configurations_1.default.CORE.MESSAGES.USER_NOT_FOUND);
        }
    }));
    it('Receiving a cyclic course', () => __awaiter(void 0, void 0, void 0, function* () {
        let response = yield coursesInteractor.addCourses(configurations_1.default.TEST.CYCLIC_COURSE);
        try {
            response = yield coursesInteractor.getCourses(configurations_1.default.TEST.CYCLIC_COURSE.userId);
            throw new Error(configurations_1.default.TEST.MUST_RETURN_ERROR);
        }
        catch (error) {
            expect(error.message).to.equal(configurations_1.default.CORE.MESSAGES.CYCLE_COURSE_FOUND);
        }
    }));
    // it('Receiving a multiple cyclic courses', async () => {
    //     let response = await coursesInteractor.addCourses(configurations.TEST.CYCLIC_COURSES)
    //     try{
    //         response = await coursesInteractor.getCourses(configurations.TEST.CYCLIC_COURSES.userId)
    //         throw new Error(configurations.TEST.MUST_RETURN_ERROR);
    //     }catch(error:any){
    //         expect(error.message).to.equal(configurations.TEST.CYCLIC_ERROR)
    //     }
    // })
});
