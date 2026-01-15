import { Request, Response } from "express";
import { createStockMovement } from "./stockMovement.service";
import { StockMovement } from "./stockMovement.model";
import { parse } from "json2csv";
import { Types } from "mongoose";

export const exportMovementsCSV = async (req: Request, res: Response) => {
  const { productId } = req.params;
  if (!productId || typeof productId !== "string")
    return res.status(400).json({ error: "Invalid product id" });
  const movements = await StockMovement.find({
    product: new Types.ObjectId(productId),
  })
    .populate("product", "name sku")
    .sort({ createdAt: -1 })
    .lean();

  if (movements.length === 0)
    return res.status(400).json({ error: "No movements found" });

  const fields = [
    { label: "Product name", value: "product.name" },
    { label: "SKU", value: "product.sku" },
    { label: "Type", value: "type" },
    { label: "Quantity", value: "quantity" },
    { label: "Reason", value: "reason" },
    { label: "User", value: "user" },
    { label: "Date", value: "createdAt" },
  ];

  const csv = parse(movements, { fields });

  res.header("Content-Type", "text/csv");
  res.attachment(`stock-movements-${productId}.csv`);
  res.send(csv);
};

export const createMovement = async (req: Request, res: Response) => {
  try {
    const { productId, type, quantity, reason } = req.body;
    const result = await createStockMovement({
      productId,
      type,
      quantity,
      reason,
      user: "ADMIN", // o req.user?.email en el futuro
    });

    res.status(201).json({
      message: "Stock movement created",
      product: result.product,
      movement: result.movement,
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getMovementsByProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    if (!productId || typeof productId !== "string")
      return res.status(400).json({ error: "Invalid product id" });
    const movements = await StockMovement.find({ product: productId }).sort({
      createdAt: -1,
    });
    res.json(movements);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
