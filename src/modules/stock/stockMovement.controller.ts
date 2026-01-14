import { Request, Response } from "express";
import { createStockMovement } from "./stockMovement.service";
import { StockMovement } from "./stockMovement.model";

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
    if (typeof productId !== "string")
      return res.status(400).json({ error: "Invalid product id" });
    const movements = await StockMovement.find({ product: productId }).sort({
      createdAt: -1,
    });
    res.json(movements);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
