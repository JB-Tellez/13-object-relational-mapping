import {
  Mockgoose,
} from 'mockgoose';
import mongoose from 'mongoose';

it('whatevs', () => {
  expect('test only here til I figure out easy way to ignore this file');
});

// WARNING: Give a LONG timeout because Travis runs slow
// due to Mongo
jest.setTimeout(60000);

const mockgoose = new Mockgoose(mongoose);

console.log('models.helper FTW');

export default {
  afterAll: (done) => {
    mongoose.connection.close().then(() => {

      console.log('close mongoose connection');

      done();
    });
  },

  beforeAll: done => {
    mockgoose.prepareStorage().then(() => {
      mongoose.connect('mongodb://127.0.0.1/singers').then(() => {
        done();
      });
    });
  },

  afterEach: done => {
    mockgoose.helper.reset().then(done);
  },
};