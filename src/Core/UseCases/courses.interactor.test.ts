import configurations from '../../configurations'
import chai from 'chai'
import CoursesInteractor from './courses.interactor'
import Container from '../Utils/dependencies.utils'
import CoursesDatasource from '../../DB/Postgres/courses.datasource'


const expect = chai.expect

// Register dependencies for CoursesInteractor class 
const dependencies: Container = new Container()
dependencies.singleton('Settings', configurations)
dependencies.register('CoursesOutput', CoursesDatasource)
dependencies.register('CoursesInteractor', CoursesInteractor, ['Settings', 'CoursesOutput'])
const coursesInteractor = dependencies.get('CoursesInteractor')

describe('Courses interactor method addCourses', () => {

    it('addCourses works fine with test data', async () => {
        const response = await coursesInteractor.addCourses(configurations.TEST.TEST_DATA)
        expect(response.ok).to.equal(true)
    })

    it('Return the list of courses sent', async () => {
        const response = await coursesInteractor.addCourses(configurations.TEST.TEST_DATA)
        expect(response.data[0].desiredCourse).to.equal(configurations.TEST.TEST_DATA.courses[0].desiredCourse)
    })

    it('Return error if userId were not found', async () => {
        try{
            const testData = {userId:'', courses:configurations.TEST.TEST_DATA.courses}
            const response = await coursesInteractor.addCourses(testData)
            throw new Error(configurations.TEST.MUST_RETURN_ERROR);
        }catch(error:any){
            expect(error.message).to.equal(configurations.CORE.MESSAGES.MISSING_USERID)
        }
    })

    it('Return error if courses were not found', async () => {
        try{
            const testData = {userId:configurations.TEST.TEST_DATA.userId}
            const response = await coursesInteractor.addCourses(testData)
            throw new Error(configurations.TEST.MUST_RETURN_ERROR);
        }catch(error:any){
            expect(error.message).to.equal(configurations.CORE.MESSAGES.MISSING_COURSES)
        }
    })

    it('Return error if desiredCourse were not found on all courses', async () => {
        try{
            let testData = structuredClone(configurations.TEST.TEST_DATA)
            testData.courses[0].desiredCourse = ''
            const response = await coursesInteractor.addCourses(testData)
            throw new Error(configurations.TEST.MUST_RETURN_ERROR);
        }catch(error:any){
            expect(error.message).to.equal(configurations.CORE.MESSAGES.MISSING_DESIRED_COURSE)
        }
    })

})




describe('Courses interactor method getCourses', () => {

    it('Works fine with test data', async () => {
        const response = await coursesInteractor.getCourses(configurations.TEST.USER)
        expect(response.ok).to.equal(true)
    })

    it('Works fine with non existing userId', async () => {
        const response = await coursesInteractor.getCourses(configurations.TEST.NON_EXISTING_USER)
        expect(response.ok).to.equal(true)
        expect(response.message).to.equal(configurations.CORE.MESSAGES.USER_WITHOUT_COURSES)
    })

    it('Works fine without userId', async () => {
        try{
            const response = await coursesInteractor.getCourses()
            throw new Error(configurations.TEST.MUST_RETURN_ERROR);
        }catch(error:any){
            expect(error.message).to.equal(configurations.CORE.MESSAGES.USER_NOT_FOUND)
        }
    })

    it('Receiving a cyclic course', async () => {
        let response = await coursesInteractor.addCourses(configurations.TEST.CYCLIC_COURSE)
        try{
            response = await coursesInteractor.getCourses(configurations.TEST.CYCLIC_COURSE.userId)
            throw new Error(configurations.TEST.MUST_RETURN_ERROR);
        }catch(error:any){
            expect(error.message).to.equal(configurations.CORE.MESSAGES.CYCLE_COURSE_FOUND)
        }
    })

    // it('Receiving a multiple cyclic courses', async () => {
    //     let response = await coursesInteractor.addCourses(configurations.TEST.CYCLIC_COURSES)
    //     try{
    //         response = await coursesInteractor.getCourses(configurations.TEST.CYCLIC_COURSES.userId)
    //         throw new Error(configurations.TEST.MUST_RETURN_ERROR);
    //     }catch(error:any){
    //         expect(error.message).to.equal(configurations.TEST.CYCLIC_ERROR)
    //     }
    // })



})


