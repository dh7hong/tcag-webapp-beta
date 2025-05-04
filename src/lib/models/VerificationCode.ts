// src/lib/models/VerificationCode.ts
import { Schema, model, models } from 'mongoose';

const VerificationCodeSchema = new Schema({
  phoneNumber: { type: String, required: true, unique: true },
  code: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 300 }, // 5 min expiration
});

export default models.VerificationCode || model('VerificationCode', VerificationCodeSchema);

