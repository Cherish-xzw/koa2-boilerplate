import _app from '..';
import request from 'supertest';
import should from 'should';

const app = _app.callback();

describe('app', function() {
  it('should response / with 200', function() {
    request(app)
      .get('/')
      .expect(200);
  });
});

describe('calculator', function() {
  const cal = require('./fixture');
  it('should return 2 with argu 4,2', function(done) {
    cal.asyncCalculatorCallback(4, 2, function(err, result) {
      if (err) done(err);
      result.should.equal(2);
      done();
    });
  });

  it('should throw error', function(done) {
    cal.asyncCalculatorCallback(4, 0, function(err, result) {
      should.exists(err);
      should.not.exists(result);
      done();
    });
  });

  it('should return 2 with argu 4,2', function() {
    return cal.asyncCalculatorPromise(4, 2).then(result => {
      result.should.equal(2);
    });
  });

  it('should throw error', function() {
    return cal
      .asyncCalculatorPromise(4, 0)
      .then(result => {
        should.not.exists(result);
      })
      .catch(error => {
        should.exists(error);
      });
  });

  it('should return 2 with argu 4,2', async function() {
    const result = await cal.asyncCalculatorPromise(4, 2);
    result.should.equal(2);
  });

  it('should throw error', async function() {
    try {
      const result = await cal.asyncCalculatorPromise(4, 0);
      should.not.exists(result);
    } catch (error) {
      should.exists(error);
    }
  });
});
