import Course from './Entities/course.entity'
import CoursesOutput from '../Adapters/courses.output'



export default class CoursesInteractor {

    protected coursesOutput: CoursesOutput
    protected configurations: any

    constructor(configurations: any, coursesOutput: CoursesOutput) {
        this.configurations = configurations
        this.coursesOutput = coursesOutput
    }

    public async addCourses(rawData: any): Promise<{ ok: boolean, message: string, data: Array<Course | null> }> {
        try {

            // Check if the structure of the raw data are correct
            let courses: Array<Course> = []
            if (!rawData.userId) throw Error(this.configurations.CORE.MESSAGES.MISSING_USERID)
            if (!rawData.courses) throw Error(this.configurations.CORE.MESSAGES.MISSING_COURSES)
            rawData.courses.map((rawCourse: any) => {
                if (!rawCourse.desiredCourse) throw Error(this.configurations.CORE.MESSAGES.MISSING_DESIRED_COURSE)
                if (rawCourse.requiredCourse && Array.isArray(rawCourse.requiredCourse)) rawCourse.requiredCourse = rawCourse.requiredCourse.join(',')
                const course: Course = { ...rawCourse, userId: rawData.userId }
                courses.push(course)
            })

            // Save all courses sent
            let querys: Array<Promise<Course | null>> = []
            for (let course of courses) {
                querys.push(this.coursesOutput.create(course))
            }
            let response = await Promise.all(querys)
            return { ok: true, message: this.configurations.CORE.MESSAGES.SAVE_OK, data: response }

        } catch (error: any) { throw Error(error.message) }
    }


    public async getCourses(userId: string): Promise<{ ok: boolean, message: string, data: Array<string | null> }> {
        try {

            if (!userId) throw Error(this.configurations.CORE.MESSAGES.USER_NOT_FOUND)

            // Get all user courses
            let courses = await this.coursesOutput.getAll(userId)
            if (!courses.length) return { ok: true, message: this.configurations.CORE.MESSAGES.USER_WITHOUT_COURSES, data: [] }

            // Transform the lists of requiredCourses on arrays
            courses = courses.map((x: any) => {
                return { userId: x.userId, desiredCourse: x.desiredCourse, requiredCourse: x.requiredCourse ? x.requiredCourse.split(',') : [] }
            })

            // If there is a prerequisite not existing on courses, I have to create it
            courses.forEach((x: any) => {
                x.requiredCourse.forEach((y: any) => {
                    if (!courses.find(m => m.desiredCourse == y)) {
                        const newCourse: any = { userId: x.userId, desiredCourse: y, requiredCourse: [] }
                        courses.push(newCourse)
                    }
                })
            })

            // Sort courses and generate the result list
            const sortedCourses: any = this.topoSort(courses, this.configurations)
            let list = [...sortedCourses.map((x: any) => x.desiredCourse)]

            return { ok: true, message: this.configurations.CORE.MESSAGES.GET_OK, data: list }

        } catch (error: any) { throw Error(error.message) }
    }



    private topoSort(courses: any, configurations: any) {
        const visited = new Set
        const courseMap = new Map(courses.map((course: any) => [course.desiredCourse, course]))
        function depthFirstSearch(courses: any) {
            for (let course of courses) {
                if (!visited.has(course.desiredCourse)) {
                    if (course.desiredCourse == course.requiredCourse.toString()) throw Error(configurations.CORE.MESSAGES.CYCLE_COURSE_FOUND)
                    depthFirstSearch(course.requiredCourse.map((id: any) => courseMap.get(id)));
                }
                visited.add(course)
            }
        }
        depthFirstSearch(courses)
        return [...visited]
    }



}