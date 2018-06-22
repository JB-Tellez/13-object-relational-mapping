
import Band from '../../../src/models/bands.js';
import Singer from '../../../src/models/singers.js';
import modelsHelper from './models.helper';

describe('band', () => {

  afterAll(modelsHelper.afterAll);
  beforeAll(modelsHelper.beforeAll);
  afterEach(modelsHelper.afterEach);

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