import configurations from '../../configurations'
import { Request, Response } from 'express'

class Controller {

    public index(req: Request, res: Response): void {

        res.status(200).json({
            state: configurations.SERVER.MESSAGES.SERVER_STATE_RUNNING+(new Date()).toISOString()
        })

    }

}

export const controller = new Controller()