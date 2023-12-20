const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../app');

chai.use(chaiHttp);

let token;

describe('/api/movies/ tests', () => {
    before((done) => {
        chai.request(server)
            .post('/users/authenticate')
            .send({ username: 'Mehmet 5', password: '12345'})
            .end((err,res) => {
                token = res.body.token;
                done();
            });
    });

    describe('/GET Movies', () => {
        it('should get all movies', (done) => {
            chai.request(server)
                .get('/api/movies')
                .set('x-access-token',token)
                .end((err,res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });

    describe('/POST Movies', () => {
        it('should add movies', (done) => {
            const movie = {
                director_id : "6578d24b0473ec8ba28208e9",
                title : "test data",
                category: "test category",
                country: "Turkiye",
                year: 2000,
                imdb_score: 8.1,
            };

            chai.request(server)
                .post('/api/movies/add')
                .send(movie)
                .set('x-access-token',token)
                .end((err,res) => {
                    res.should.have.be.a('object');
                    res.body.should.have.property('title');
                    res.body.should.have.property('category');
                    res.body.should.have.property('country');
                    res.body.should.have.property('year');
                    res.body.should.have.property('imdb_score');
                    res.body.should.have.property('director_id');
                    done();
                });
        });
    });
});
