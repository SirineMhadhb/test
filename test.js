const request = require('supertest');
const assert = require('assert');
const app = require('../workspace/test.js');

const { describe, it } = require('mocha');

describe('User API', function () {
  it('should create a new user', function (done) {
    const newUser = {
      username: 'sirine',
      email: 'sirine@example.com',
    };

    request(app)
      .post('/users')
      .send(newUser)
      .expect(201)
      .end(function (err, res) {
        if (err) return done(err);

        assert.equal(res.body.username, newUser.username);
        assert.equal(res.body.email, newUser);

        done();
      });
  });

  it('should return 400 for missing data', function (done) {
    const incompleteUser = {
      username: 'sirine',
    };

    request(app)
      .post('/users')
      .send(incompleteUser)
      .expect(400, done);
  });
});
