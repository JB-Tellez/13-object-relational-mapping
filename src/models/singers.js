import mongoose, {Schema} from 'mongoose';

const schema = Schema({
  name: String,
  rank: Number,
});

export default mongoose.model('Singer', schema);