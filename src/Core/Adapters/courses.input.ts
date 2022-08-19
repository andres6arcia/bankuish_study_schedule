import Container from '../Utils/dependencies.utils'
import CoursesInteractor from '../UseCases/courses.interactor'
import Course from '../UseCases/Entities/course.entity'
import configurations from '../../configurations'
import CoursesDatasource from '../../DB/Postgres/courses.datasource'


class CoursesInput {

    protected dependencies: Container = new Container()
    protected coursesInteractor: CoursesInteractor

    constructor() {
        // Register dependencies for CoursesInteractor class 
        this.dependencies.singleton('Settings', configurations)
        this.dependencies.register('CoursesOutput', CoursesDatasource)
        this.dependencies.register('CoursesInteractor', CoursesInteractor, ['Settings', 'CoursesOutput'])
        this.coursesInteractor = this.dependencies.get('CoursesInteractor')
    }

    public async addCourses(rawData: any): Promise<{ ok: boolean, message: string, data: Array<Course | null> }> {
        return await this.coursesInteractor.addCourses(rawData)
    }

    public async getCourses(userId: string): Promise<{ ok: boolean, message: string, data: Array<Course | null> }> {
        return await this.coursesInteractor.getCourses(userId)
    }

}
export default new CoursesInput();