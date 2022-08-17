"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
const configurations_1 = __importDefault(require("../../configurations"));
class Controller {
    index(req, res) {
        res.status(200).json({
            state: configurations_1.default.SERVER.MESSAGES.SERVER_STATE_RUNNING + (new Date()).toISOString()
        });
    }
}
exports.controller = new Controller();
