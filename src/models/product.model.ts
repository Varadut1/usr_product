import mongoose from "mongoose";
import { Schema, Document } from "mongoose";
import { userDocument } from "./user.model";

export interface Product extends Document {
  user: userDocument["_id"];
  title: string;
  description: string;
  price: number;
  image: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const productSchema = new Schema<Product>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const ProductModel = mongoose.model<Product>("Product", productSchema);

export default ProductModel;
