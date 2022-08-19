import configurations from '../../configurations'
import coursesRoutes from './courses.routes'
import chai from 'chai'


const expect = chai.expect
const routes = coursesRoutes.stack

describe('Courses Routes', () => {

    it('POST ' + configurations.SERVER.ROUTES.POST_COURSES + ' Route', async () => {
        expect(routes.some(x => Object.keys(x.route.methods).includes('post'))).to.equal(true)
        expect(routes.some(x => x.route.path === configurations.SERVER.ROUTES.POST_COURSES)).to.equal(true)
    })

    it('GET ' + configurations.SERVER.ROUTES.GET_COURSES + ' Route', async () => {
        expect(routes.some(x => Object.keys(x.route.methods).includes('get'))).to.equal(true)
        expect(routes.some(x => x.route.path === configurations.SERVER.ROUTES.GET_COURSES)).to.equal(true)
    })

})

