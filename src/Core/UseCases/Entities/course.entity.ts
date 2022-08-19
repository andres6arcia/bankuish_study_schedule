
export default interface ICourse {
    desiredCourse: string 
    userId: string
    requiredCourse?: string

    created_at?: Date
    updated_at?: Date
}