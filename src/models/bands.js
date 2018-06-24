import mongoose, {Schema} from 'mongoose';

const schema = new Schema({
  name : String,
  singer: {type: Schema.Types.ObjectId, ref:'Singer'},
});

export default mongoose.model('Band', schema);