import configurations from '../configurations'
import express from "express"
import morgan from "morgan"

import indexRoutes from './Routes/index.route' 
import coursesRoutes from './Routes/courses.routes'

export default class Server {
    protected app: express.Application

    public constructor() {
        this.app = express()
        this.initialize()
    }

    public getApp(){
        return this.app 
    }

    protected async initialize() {
        await this.configuration()
        await this.routes()
        await this.start()
    }

    protected async configuration() {
        // Settings
        this.app.set(configurations.SERVER.SETTINGS.PROPERTY_PORT, configurations.SERVER.SETTINGS.PORT)

        // Middlewares
        this.app.use(morgan(configurations.SERVER.SETTINGS.MORGAN_SETTINGS))
        this.app.use(express.json())
    }

    protected async routes() {
        this.app.use(indexRoutes)
        this.app.use(coursesRoutes)
    }

    protected async start() {
        await this.app.listen(this.app.get(configurations.SERVER.SETTINGS.PROPERTY_PORT))
        console.log(configurations.SERVER.MESSAGES.SERVER_ON, this.app.get(configurations.SERVER.SETTINGS.PROPERTY_PORT))
    }


}