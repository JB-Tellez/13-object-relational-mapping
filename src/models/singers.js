import mongoose, {Schema} from 'mongoose';

const schema = Schema({
  name: {type: String, required:true},
  rank: {type: Number, required:true},
});

export default mongoose.model('Singer', schema);