import Singer from '../../../src/models/singers.js';
import Band from '../../../src/models/bands.js';
import modelsHelper from '../../../scripts/models.helper.js';

describe('singer model', () => {

  afterAll(modelsHelper.afterAll);
  beforeAll(modelsHelper.beforeAll);
  afterEach(modelsHelper.afterEach);

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
      rank: 1
    });

    return singer.save().then(whitney => {
      expect(whitney.name).toEqual('Whitney Houston');
    }).catch(err => fail(err));
  });

  it('should get collection of created singers', () => {


    const singerObj = {
      name: 'Roy Orbison',
      rank: 12
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
      rank: 9999999999
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

    return Singer.findById('wrong').then(singer => {
      fail('should not get here');
    }).catch(err => {
      expect(err).toBeDefined();
    })
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
        rank: 100
      })
      .then(singer => fail('should not get here'))
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
        rank: 12
      })
      .then(singer => {

        return Singer
          .findByIdAndUpdate(singer._id, {})
          .then(singer => {
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