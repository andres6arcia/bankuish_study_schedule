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
const courses_routes_1 = __importDefault(require("./courses.routes"));
const chai_1 = __importDefault(require("chai"));
const expect = chai_1.default.expect;
const routes = courses_routes_1.default.stack;
describe('Courses Routes', () => {
    it('POST ' + configurations_1.default.SERVER.ROUTES.POST_COURSES + ' Route', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(routes.some(x => Object.keys(x.route.methods).includes('post'))).to.equal(true);
        expect(routes.some(x => x.route.path === configurations_1.default.SERVER.ROUTES.POST_COURSES)).to.equal(true);
    }));
    it('GET ' + configurations_1.default.SERVER.ROUTES.GET_COURSES + ' Route', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(routes.some(x => Object.keys(x.route.methods).includes('get'))).to.equal(true);
        expect(routes.some(x => x.route.path === configurations_1.default.SERVER.ROUTES.GET_COURSES)).to.equal(true);
    }));
});
