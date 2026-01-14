import { Types } from "mongoose";
import { Product } from "../products/product.model";
import { StockMovement, StockMovementType } from "./stockMovement.model";

interface CreateMovementParams {
  productId: string;
  type: StockMovementType;
  quantity: number;
  reason?: string;
  user?: string;
}

export async function createStockMovement({
  productId,
  type,
  quantity,
  reason = "",
  user = "system",
}: CreateMovementParams) {
  const product = await Product.findById(productId);
  if (!product) throw new Error("Product not found");
  if (type == "OUT" && product.stock < quantity) {
    throw new Error("Insufficient stock");
  }
  if (type == "IN") product.stock += quantity;
  if (type == "OUT") product.stock -= quantity;
  if (type == "ADJUST") product.stock = quantity;

  await product.save();

  //se registra movimiento
  const movement = await StockMovement.create({
    product: product._id,
    type,
    quantity,
    reason,
    user,
  });

  return { product, movement };
}
