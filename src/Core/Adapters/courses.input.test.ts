import configurations from '../../configurations'
import chai from 'chai'
import coursesInput from './courses.input'


const expect = chai.expect
function sleep(ms: number) { return new Promise(resolve => setTimeout(resolve, ms)) }

describe('Courses Inputs create dependencies', () => {

    before(async ()=>{
        await sleep(1000) // Wait for create instances
    })

    it('addCourses receive all needed dependencies', async () => {
        const response = await coursesInput.addCourses(configurations.TEST.TEST_DATA)
        expect(response.ok).to.equal(true)
    })

    it('getCourses receive all needed dependencies', async () => {
        const response = await coursesInput.getCourses(configurations.TEST.USER)
        expect(response.ok).to.equal(true)
    })

})

