process.env.NODE_ENV = 'test';
let { Users } = require('../server/models/index');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server/index');

chai.use(chaiHttp);
describe('session', () => {
    beforeEach((done) => {
        Users.remove({}, (err) => {
            done();
        });
    });

    describe('/POST sessions', () => {
        it('should log in user', (done) => {
            let credentials = {
                email: "mologasta+1@gmail.com",
                password: "Cleveroad11"
            };
            chai.request(server)
                .post('/api/v1/sessions')
                .send(credentials)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.contain.keys('accessToken');
                    done();
                });
        });
    });

    describe('/DELETE sessions', () => {
        it('should log out user', (done) => {
            let credentials = {
                email: "mologasta+1@gmail.com",
                password: "Cleveroad11"
            };
            chai.request(server)
                .delete('/api/v1/sessions')
                .set('Authorization', 'Bearer')
                .send(credentials)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });

    describe('/PUT sessions', () => {
        it('should refresh users token', (done) => {
            let credentials = {
                email: "mologasta+1@gmail.com",
                password: "Cleveroad11"
            };
            chai.request(server)
                .put('/api/v1/sessions')
                .set('Authorization', 'Bearer')
                .send(credentials)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.contain.keys('accessToken');
                    done();
                });
        });
    });

});
