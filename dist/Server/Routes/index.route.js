"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const configurations_1 = __importDefault(require("../../configurations"));
const express_1 = require("express");
const index_controller_1 = require("../Controllers/index.controller");
class IndexRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    getRoutes() {
        return this.router;
    }
    routes() {
        this.router.get(configurations_1.default.SERVER.ROUTES.INDEX, index_controller_1.controller.index);
    }
}
exports.default = new IndexRoutes().getRoutes();
