import configurations from '../../configurations'
import { Router, Request, Response } from 'express'
import { controller } from '../Controllers/index.controller'


class IndexRoutes {
    protected router: Router

    public constructor() {
        this.router = Router()
        this.routes()
    }

    public getRoutes(): Router {
        return this.router
    }

    protected routes() {
        this.router.get(configurations.SERVER.ROUTES.INDEX, controller.index)
    }
}

export default new IndexRoutes().getRoutes()