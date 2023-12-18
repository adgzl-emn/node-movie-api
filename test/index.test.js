const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../app');

chai.use(chaiHttp);

describe('Node Server', () => {
    it('should Home page (GET /)', (done) => {
        chai.request(server)
            .get('/')
            .end((err,res) => {
               res.should.have.status(200);
               done();
            });
    });
});