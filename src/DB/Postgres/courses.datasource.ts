import { PostgresDataSource } from "./postgres.database";
import Course from "./Models/course.model"
import CoursesOutput from "../../Core/Adapters/courses.output"

export default class CoursesDatasource implements CoursesOutput{

    constructor(){
        PostgresDataSource.initialize()
    }

    async getAll(userId: string): Promise<Course[]> {
         return await Course.find({where:{userId}})
    }

    async getById(name: string): Promise<Course | null> {
        return await Course.findOne({where:{desiredCourse:name}})
    }

    async create(course: Course): Promise<Course | null> {
        const newCourse = new Course()
        newCourse.desiredCourse = course.desiredCourse
        newCourse.requiredCourse = course.requiredCourse
        newCourse.userId = course.userId
        return await newCourse.save()
    }

    async update(course: Course): Promise<Course | null> {
        let response = await Course.findOne({where:{desiredCourse:course.desiredCourse}})
        if (!response) return null 
        response.desiredCourse = course.desiredCourse
        response.requiredCourse = course.requiredCourse
        response.userId = course.userId
        return await response?.save()
    }

    async delete(name: string): Promise<void> {
        let response = await Course.findOne({where:{desiredCourse:name}})
        if(response) await response?.remove()
    }

}