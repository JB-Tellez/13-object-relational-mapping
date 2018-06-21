import mongoose, {Schema} from 'mongoose';

const schema = Schema({
  name: {type: String, required:true},
  rank: {type: Number, required:true},
});

const skipInit = process.env.NODE_ENV === 'test';

export default mongoose.model('Singer', schema, 'singers', skipInit);