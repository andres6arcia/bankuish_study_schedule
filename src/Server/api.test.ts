import configurations from '../configurations';
import Server from './server'
import request from 'supertest'
import chai from 'chai'


const expect = chai.expect
const app = new Server().getApp()
function sleep(ms: number) { return new Promise(resolve => setTimeout(resolve, ms)) }

describe('Server', () => {

    before(async ()=>{
        await sleep(1000) // Wait for create instances
    })

    it('The server is up', async () => {
        const response = await request(app).get(configurations.SERVER.ROUTES.INDEX).set('accept', 'application/json')
        expect(response.headers["content-type"]).to.match(new RegExp(/json/));
        expect(response.status).to.equal(200);
        expect(response.body.state).to.match(new RegExp(configurations.SERVER.MESSAGES.SERVER_STATE_RUNNING))
    })

})

describe('Courses Controllers', () => {

    it('POST ' + configurations.SERVER.ROUTES.POST_COURSES + ' Controller: if error occures return 500', async () => {
        const response = await request(app).post(configurations.SERVER.ROUTES.POST_COURSES).set('accept', 'text/html')
        expect(response.headers["content-type"]).to.match(new RegExp(/text/));
        expect(response.status).to.equal(500);
        expect(response.text).to.equal(configurations.CORE.MESSAGES.MISSING_USERID)
    })

    it('POST ' + configurations.SERVER.ROUTES.POST_COURSES + ' Controller: if all works fine return 200', async () => {
        const testData = configurations.TEST.TEST_DATA
        const response = await request(app).post(configurations.SERVER.ROUTES.POST_COURSES).set('accept', 'application/json').send(testData)
        expect(response.headers["content-type"]).to.match(new RegExp(/json/));
        expect(response.status).to.equal(200);
        expect(response.body.ok).to.equal(true)
    })

    it('GET ' + configurations.SERVER.ROUTES.GET_COURSES + ' Controller: if error occures return 500', async () => {
        const response = await request(app).post(configurations.SERVER.ROUTES.POST_COURSES).set('accept', 'text/html')
        expect(response.headers["content-type"]).to.match(new RegExp(/text/));
        expect(response.status).to.equal(500);
        expect(response.text).to.equal(configurations.CORE.MESSAGES.MISSING_USERID)
    })

    it('GET ' + configurations.SERVER.ROUTES.GET_COURSES + ' Controller: if all works fine return 200', async () => {
        const response = await request(app).get(configurations.SERVER.ROUTES.GET_COURSES.replace(':userId', configurations.TEST.USER)).set('accept', 'application/json')
        expect(response.headers["content-type"]).to.match(new RegExp(/json/));
        expect(response.status).to.equal(200);
        expect(response.body.ok).to.equal(true)
    })

})