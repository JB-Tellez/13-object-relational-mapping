import {
  Mockgoose,
} from 'mockgoose';
import mongoose from 'mongoose';

it('whatevs', () => {
  expect('test only here til I figure out easy way to ignore this file');
});

jest.setTimeout(30000);

const mockgoose = new Mockgoose(mongoose);

console.log('models.helper FTW');

export default {
  afterAll: () => {
    mongoose.connection.close();
    console.log('close mongoose connection');
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