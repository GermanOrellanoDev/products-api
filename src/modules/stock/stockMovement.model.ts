import { Schema, model, Types } from "mongoose";

export type StockMovementType = "IN" | "OUT" | "ADJUST";

const stockMovementSchema = new Schema(
  {
    product: {
      type: Types.ObjectId,
      ref: "Product",
      required: true,
    },
    type: {
      type: String,
      enum: ["IN", "OUT", "ADJUST"],
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    reason: {
      type: String,
      default: "",
    },
    user: {
      type: String,
      default: "system",
    },
  },
  { timestamps: true }
);

export const StockMovement = model("StockMovement", stockMovementSchema);
