"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const configurations_1 = __importDefault(require("../../configurations"));
const express_1 = require("express");
const courses_controller_1 = require("../Controllers/courses.controller");
class CoursesRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    getRoutes() {
        return this.router;
    }
    routes() {
        this.router.post(configurations_1.default.SERVER.ROUTES.POST_COURSES, courses_controller_1.controller.addCourses);
        this.router.get(configurations_1.default.SERVER.ROUTES.GET_COURSES, courses_controller_1.controller.getCourses);
    }
}
exports.default = new CoursesRoutes().getRoutes();
