import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
  phoneNumber: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: Number,
  gender: String,
  preferredStyle: String,
  heightCm: Number,
  preferredSize: String,
  preferredColors: [String],
  bodyType: String,
  shoppingFrequency: String,
  avgSpend: String,
}, { timestamps: true });

const User = models.User || model('User', userSchema);
export default User;