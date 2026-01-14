import { Request, Response, NextFunction } from "express";
import * as productService from "./product.service";

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const payload = req.body;
    const product = await productService.createProduct(payload);
    res.status(201).json({ message: "Product created", product });
  } catch (error) {
    next(error);
  }
};

export const listProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await productService.listProducts(req.query);
    res.json({ result });
  } catch (error) {
    next(error);
  }
};

export const getProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "Product id is required" });
    if (typeof id !== "string")
      return res.status(400).json({ error: "Invalid product id" });
    const product = await productService.getProductById(id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json({ product });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const payload = req.body;
  if (typeof id !== "string")
    return res.status(400).json({ error: "Invalid product id" });
  const updated = await productService.updateProductById(id, payload);
  if (!updated) return res.status(400).json({ error: "Product not found" });
  res.json({ message: "Product updated", product: updated });
  try {
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  if (typeof id !== "string")
    return res.status(400).json({ error: "Invalid product id" });
  const deleted = await productService.softDeleteProductById(id);
  if (!deleted) return res.status(404).json({ error: "Product not found" });
  res.json({ message: "Product disable", product: deleted });
  try {
  } catch (error) {
    next(error);
  }
};
