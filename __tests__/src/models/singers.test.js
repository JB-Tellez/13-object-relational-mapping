import {
  Mockgoose,
} from 'mockgoose';
import mongoose from 'mongoose';

const mockgoose = new Mockgoose(mongoose);

import Singer from '../../../src/models/singers.js';

describe('app module', () => {

  beforeAll((done) => {
    mockgoose.prepareStorage().then(() => {
      mongoose.connect('mongodb://localhost/singers').then(() => {
        done();
      });
    });
  });

  afterEach((done) => {
    mockgoose.helper.reset().then(done);
  });


  describe('Singer', () => {

    it('should get zero singers', () => {
      
      return Singer.find().then(students => {
        expect(students).toEqual([]);
      });
    });

    it('should create a singer', () => {

      const singerObj = {
        name: 'Otis Redding',
        rank: 1,
      };

      return Singer.create(singerObj).then(singer => {
        expect(singer.name).toBe(singerObj.name);
        expect(singer._id).toBeDefined();
      });
    });

    it('should find a singer after creating one', () => {

      const singerObj = {
        name: 'Otis Redding',
        rank: 1,
      };

      return Singer.create(singerObj).then(singer => {

        return Singer.findById(singer._id).then(foundSinger => {

          expect(foundSinger.name).toBe(singerObj.name);
        });
      });
    });

    it('should delete a singer Promise', () => {

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

    it('should delete a singer async/await', async () => {

      const newSinger = {
        name: 'Aretha Franklin',
        rank: 2,
      };

      const aretha = await Singer.create(newSinger);

      expect(aretha.name).toBe('Aretha Franklin');

      await Singer.findByIdAndRemove(aretha._id);

      const students = await Singer.find();

      expect(students.length).toBe(0);

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
      return Singer.findByIdAndUpdate('wrong', {rank:100})
        .then(singer => fail('should not get here'))
        .catch(err => {
          expect(err).toBeDefined();
        });
    });

    /* NOTE: several ways to handle this
    1. make fields required in model
    2. Have check in api for {} body
    3. Use pre save hook middleware
    */
    xit('should reject on PUT when no body provided', () => {
      return Singer
        .create({name:'Tina Turner', rank: 12})
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

});