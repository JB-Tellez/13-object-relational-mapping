import supertest from 'supertest';
import {
  server,
} from '../../../src/app.js';
import modelsHelper from '../../../scripts/models.helper.js';

const mockRequest = supertest(server);

const API_URL = '/api/v1/singers';

describe('api module', () => {

  afterAll(modelsHelper.afterAll);
  beforeAll(modelsHelper.beforeAll);
  afterEach(modelsHelper.afterEach);

  it('mockRequest should exist', () => {
    expect(mockRequest).toBeDefined();
  });

  it('should get [] for singers off the bat', () => {

    return mockRequest.get(API_URL).then(results => {
      expect(JSON.parse(results.text)).toEqual([]);
    }).catch(err => {
      fail(err);
    });

  });

  it('should post a singer', () => {

    const singerObj = {
      name: 'Roy Orbison',
      rank: 8,
    };

    return mockRequest
      .post(API_URL)
      .send(singerObj)
      .then(results => {

        try {
          const singer = JSON.parse(results.text);
          expect(singer.name).toBe(singerObj.name);
          expect(singer._id).toBeDefined();
        } catch (error) {
          fail(err);
        }
      }).catch(err => fail(err));
  });

  it('should add to all singers after a post', () => {

    const singerObj = {
      name: 'Etta James',
      rank: 9,
    };

    return mockRequest
      .post(API_URL)
      .send(singerObj)
      .then(() => {

        return mockRequest
          .get(API_URL)
          .then(results => JSON.parse(results.text))
          .then(singers => expect(singers.length).toBe(1))
          .catch(err => fail(err));
      });

  });

  xit('to do - delete, error codes, etc.', () => {});

});