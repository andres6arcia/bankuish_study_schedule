import { Request, Response } from 'express'
import coursesInput from '../../Core/Adapters/courses.input'


class Controller {

    public async addCourses(req: Request, res: Response): Promise<void> {
        try {
            let response = await coursesInput.addCourses(req.body)
            res.status(200).json(response)
        } catch (error: any) { res.status(500).send(error.message) }
    }

    public async getCourses(req: Request, res: Response): Promise<void> {
        try {
            const {userId} = req.params
            let response = await coursesInput.getCourses(userId)
            res.status(200).json(response)
        } catch (error: any) { res.status(500).send(error.message) }
    }

}

export const controller = new Controller()