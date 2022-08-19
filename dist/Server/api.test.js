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
const configurations_1 = __importDefault(require("../configurations"));
const server_1 = __importDefault(require("./server"));
const supertest_1 = __importDefault(require("supertest"));
const chai_1 = __importDefault(require("chai"));
const expect = chai_1.default.expect;
const app = new server_1.default().getApp();
function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }
describe('Server', () => {
    before(() => __awaiter(void 0, void 0, void 0, function* () {
        yield sleep(1000); // Wait for create instances
    }));
    it('The server is up', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get(configurations_1.default.SERVER.ROUTES.INDEX).set('accept', 'application/json');
        expect(response.headers["content-type"]).to.match(new RegExp(/json/));
        expect(response.status).to.equal(200);
        expect(response.body.state).to.match(new RegExp(configurations_1.default.SERVER.MESSAGES.SERVER_STATE_RUNNING));
    }));
});
describe('Courses Controllers', () => {
    it('POST ' + configurations_1.default.SERVER.ROUTES.POST_COURSES + ' Controller: if error occures return 500', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).post(configurations_1.default.SERVER.ROUTES.POST_COURSES).set('accept', 'text/html');
        expect(response.headers["content-type"]).to.match(new RegExp(/text/));
        expect(response.status).to.equal(500);
        expect(response.text).to.equal(configurations_1.default.CORE.MESSAGES.MISSING_USERID);
    }));
    it('POST ' + configurations_1.default.SERVER.ROUTES.POST_COURSES + ' Controller: if all works fine return 200', () => __awaiter(void 0, void 0, void 0, function* () {
        const testData = configurations_1.default.TEST.TEST_DATA;
        const response = yield (0, supertest_1.default)(app).post(configurations_1.default.SERVER.ROUTES.POST_COURSES).set('accept', 'application/json').send(testData);
        expect(response.headers["content-type"]).to.match(new RegExp(/json/));
        expect(response.status).to.equal(200);
        expect(response.body.ok).to.equal(true);
    }));
    it('GET ' + configurations_1.default.SERVER.ROUTES.GET_COURSES + ' Controller: if error occures return 500', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).post(configurations_1.default.SERVER.ROUTES.POST_COURSES).set('accept', 'text/html');
        expect(response.headers["content-type"]).to.match(new RegExp(/text/));
        expect(response.status).to.equal(500);
        expect(response.text).to.equal(configurations_1.default.CORE.MESSAGES.MISSING_USERID);
    }));
    it('GET ' + configurations_1.default.SERVER.ROUTES.GET_COURSES + ' Controller: if all works fine return 200', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get(configurations_1.default.SERVER.ROUTES.GET_COURSES.replace(':userId', configurations_1.default.TEST.USER)).set('accept', 'application/json');
        expect(response.headers["content-type"]).to.match(new RegExp(/json/));
        expect(response.status).to.equal(200);
        expect(response.body.ok).to.equal(true);
    }));
});
