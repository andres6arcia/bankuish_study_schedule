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
exports.controller = void 0;
const courses_input_1 = __importDefault(require("../../Core/Adapters/courses.input"));
class Controller {
    addCourses(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let response = yield courses_input_1.default.addCourses(req.body);
                res.status(200).json(response);
            }
            catch (error) {
                res.status(500).send(error.message);
            }
        });
    }
    getCourses(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.params;
                let response = yield courses_input_1.default.getCourses(userId);
                res.status(200).json(response);
            }
            catch (error) {
                res.status(500).send(error.message);
            }
        });
    }
}
exports.controller = new Controller();
