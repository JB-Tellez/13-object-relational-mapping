import mongoose, {Schema} from 'mongoose';

const schema = new Schema({
  name: {type: String, required:true},
  rank: {type: Number, required:true},
  band: {type: Schema.Types.ObjectId, ref: 'Band' },
});

export default mongoose.model('Singer', schema);