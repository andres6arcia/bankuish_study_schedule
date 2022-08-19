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
const courses_input_1 = __importDefault(require("./courses.input"));
const expect = chai_1.default.expect;
function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }
describe('Courses Inputs create dependencies', () => {
    before(() => __awaiter(void 0, void 0, void 0, function* () {
        yield sleep(1000); // Wait for create instances
    }));
    it('addCourses receive all needed dependencies', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield courses_input_1.default.addCourses(configurations_1.default.TEST.TEST_DATA);
        expect(response.ok).to.equal(true);
    }));
    it('getCourses receive all needed dependencies', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield courses_input_1.default.getCourses(configurations_1.default.TEST.USER);
        expect(response.ok).to.equal(true);
    }));
});
