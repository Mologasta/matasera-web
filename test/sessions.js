process.env.NODE_ENV = 'test';
let mongoose = require('mongoose');
let { Users } = require('../server/models/index');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server/index');
let should = chai.should();

chai.use(chaiHttp);
describe('Users', () => {
    beforeEach((done) => {
        Users.remove({}, (err) => {
            done();
        });
    });

    describe('/POST users', () => {
        it('it should create new user', (done) => {
            let user = {
                firstName: "Artzel",
                lastName: "Haimling",
                email: "mologasta+1@gmail.com",
                password: "Cleveroad11"
            };
            chai.request(server)
                .post('/api/v1/users')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });

});
