import supertest from 'supertest';
import {
  server,
} from '../../../src/app.js';
import modelsHelper from '../../../scripts/models.helper.js';
import Band from '../../../src/models/bands.js';
import Singer from '../../../src/models/singers.js';

const mockRequest = supertest(server);

const API_URL = '/api/v1/singers';

afterAll(modelsHelper.afterAll);
beforeAll(modelsHelper.beforeAll);
afterEach(modelsHelper.afterEach);


describe('api module', () => {


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

describe('band', () => {

  it('should populate band', async () => {

    const bandObj = {
      name: 'Iron Maiden',
    };

    const ironMaiden = await Band.create(bandObj);

    expect(ironMaiden.name).toBe(bandObj.name);

    const singerObj = {
      name: 'Bruce Dickinson',
      rank: 25,
      band: ironMaiden._id,
    };

    const bruce = await Singer.create(singerObj);

    const foundBruce = await Singer
      .findById(bruce._id)
      .populate('band')
      .exec();

    expect(foundBruce.band.name).toBe(bandObj.name);

  });
});

describe('singer model', () => {

  it('Model should exist', () => {
    expect(Singer).toBeDefined();
  });

  it('should give zilch when asking for all singers first time', () => {

    return Singer.find().then(singers => {
      expect(singers).toEqual([]);
    }).catch(err => {
      fail(err);
    });

  });

  it('should create a singer', () => {

    // remember to create a rpoiut
    let singer = new Singer({
      name: 'Whitney Houston',
      rank: 1,
    });

    return singer.save().then(whitney => {
      expect(whitney.name).toEqual('Whitney Houston');
    }).catch(err => fail(err));
  });

  it('should get collection of created singers', () => {


    const singerObj = {
      name: 'Roy Orbison',
      rank: 12,
    };

    return Singer.create(singerObj).then(roy => {

      expect(roy.name).toBe(singerObj.name);
      expect(roy.rank).toBe(singerObj.rank);
      expect(roy._id).toBeDefined();

      return Singer.find().then(singers => {
        expect(singers.length).toEqual(1);
        expect(singers[0].name).toBe(singerObj.name);
      }).catch(err => {
        fail(err);
      });

    });



  });

  it('should find one by id', () => {

    const singerObj = {
      name: 'Barry Manilow',
      rank: 9999999999,
    };

    return Singer.create(singerObj).then(barry => {

      return Singer.findById(barry._id).then(bar => {

        expect(bar.name).toEqual(singerObj.name);

      }).catch(fail);

    }).catch(fail);
  });

  it('should delete a singer - async/await version', async () => {

    const newSinger = {
      name: 'Aretha Franklin',
      rank: 2,
    };

    const aretha = await Singer.create(newSinger);

    expect(aretha.name).toBe('Aretha Franklin');

    await Singer.findByIdAndRemove(aretha._id);

    const singers = await Singer.find();

    expect(singers.length).toBe(0);

  });

  it('should delete a singer - Promise version', () => {

    return Singer
      .create({
        name: 'Aretha Franklin',
        rank: 2,
      })
      .then(singer => {

        return Singer.deleteOne({
          _id: singer._id,
        }).then(result => {

          expect(result.ok).toBe(1);

          return Singer.find().then(singers => {

            expect(singers.length).toBe(0);
          });

        });
      });
  });

  it('should reject on find when id not found', () => {

    return Singer.findById('wrong').then(() => {
      fail('should not get here');
    }).catch(err => {
      expect(err).toBeDefined();
    });
  });

  /* NOTE: several ways to handle this
  1. make fields required in model
  2. Have check in api for {} body
  3. Use pre save hook middleware
  */
  it('should reject on POST when no body provided', () => {
    return Singer
      .create({})
      .then(singer => {
        fail('should not get here:' + singer);
      })
      .catch(err => {
        expect(err).toBeDefined();
      });
  });

  it('should reject on put then id not found', () => {
    return Singer.findByIdAndUpdate('wrong', {
      rank: 100,
    })
      .then(() => fail('should not get here'))
      .catch(err => {
        expect(err).toBeDefined();
      });
  });

  /* NOTE: several ways to handle this. Expiriment!
  1. make fields required in model
  2. Have check in api for {} body
  3. Use pre save hook middleware
  */
  xit('should reject on PUT when no body provided', () => {
    return Singer
      .create({
        name: 'Tina Turner',
        rank: 12,
      })
      .then(singer => {

        return Singer
          .findByIdAndUpdate(singer._id, {})
          .then(() => {
            fail('wtf');
          }).catch(err => {
            expect(err).toBe({});
          });
      })
      .catch(err => {
        expect(err).toBe({});
      });
  });

});