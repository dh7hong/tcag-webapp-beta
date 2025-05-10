// src/lib/models/Product.ts
import { Schema, model, models } from 'mongoose';

const ProductSchema = new Schema({
  brandName: { type: String, required: true },
  productId: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  productName: { type: String, required: true },
  productPrice: { type: String, required: true },
  productImageUrl: { type: String, required: true },
  xCoordinate: { type: Number, required: false },
  yCoordinate: { type: Number, required: false },
  floorNum: { type: Number, required: false },
}, { timestamps: true });

export default models.Product || model('Product', ProductSchema);