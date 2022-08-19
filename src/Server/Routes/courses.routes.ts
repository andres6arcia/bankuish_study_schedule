import configurations from '../../configurations'
import { Router, Request, Response } from 'express'
import { controller } from '../Controllers/courses.controller'


class CoursesRoutes {
    protected router: Router

    public constructor() {
        this.router = Router()
        this.routes()
    }

    public getRoutes(): Router {
        return this.router
    }

    protected routes() {
        this.router.post(configurations.SERVER.ROUTES.POST_COURSES, controller.addCourses)
        this.router.get(configurations.SERVER.ROUTES.GET_COURSES, controller.getCourses)
    }
}

export default new CoursesRoutes().getRoutes()