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
describe('Server', () => {
    it('The server is up', () => __awaiter(void 0, void 0, void 0, function* () {
        const app = new server_1.default().getApp();
        const response = yield (0, supertest_1.default)(app).get(configurations_1.default.SERVER.ROUTES.INDEX).set('accept', 'application/json');
        expect(response.headers["content-type"]).to.match(new RegExp(/json/));
        expect(response.status).to.equal(200);
        expect(response.body.state).to.match(new RegExp(configurations_1.default.SERVER.MESSAGES.SERVER_STATE_RUNNING));
    }));
});
