import Course from "../UseCases/Entities/course.entity"

export default interface ICoursesOutput {
    getAll(userId: string): Promise<Course[]>
    getById(name: string): Promise<Course | null>
    create(course: Course): Promise<Course | null>
    update(order: Course): Promise<Course | null>
    delete(name: string): Promise<void>
}