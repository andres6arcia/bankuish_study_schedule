import configurations from '../configurations';
import Server from './server'
import request from 'supertest'
import chai from 'chai'


const expect = chai.expect 


describe('Server',()=>{

    it('The server is up', async ()=>{
        const app = new Server().getApp()
        const response = await request(app).get(configurations.SERVER.ROUTES.INDEX).set('accept','application/json')
        expect(response.headers["content-type"]).to.match(new RegExp(/json/));
        expect(response.status).to.equal(200);
        expect(response.body.state).to.match(new RegExp(configurations.SERVER.MESSAGES.SERVER_STATE_RUNNING))
    })

})