import {DataSource} from "typeorm"
import configurations from '../../configurations';
import Course from "./Models/course.model";

export const PostgresDataSource = new DataSource({
    type: <any>configurations.DB.POSTGRES.TYPE,
    logging: configurations.DB.POSTGRES.LOGGING,
    url: configurations.DB.POSTGRES.URL,
    entities: [Course],
    synchronize: configurations.DB.POSTGRES.SYNCHRONIZE
})