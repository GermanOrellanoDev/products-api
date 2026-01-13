import { Schema, model, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  sku?: string;
  quantity: number;
  price: number;
  categpry?: string;
  description: string;
  isActive: boolean;
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    sku: { type: String, trim: true, index: true },
    quantity: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 },
    categpry: { type: String, trim: true },
    description: { type: String, trim: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Product = model<IProduct>("Product", productSchema);
