import { Product } from "./product.model";
import { Types } from "mongoose";

interface ListQuery {
  page?: number | string;
  limit?: number | string;
  search?: string;
  category?: string;
  minPrice?: number | string;
  maxPrice?: number | string;
  isActive?: string | boolean;
}

export const createProduct = async (payload: Partial<any>) => {
  const product = await Product.create(payload);
  return product;
};

export const listProducts = async (query: ListQuery) => {
  const page = Math.max(1, Number(query.page || 1));
  const limit = Math.min(100, Number(query.limit || 10));
  const skip = (page - 1) * limit;

  const filter: any = {};
  if (query.search) {
    const regex = new RegExp(String(query.search), "i");
    filter.$or = [{ name: regex }, { description: regex }, { sku: regex }];
  }
  if (query.category) filter.category = query.category;
  if (typeof query.isActive !== "undefined") {
    filter.isActive = query.isActive === "true" || query.isActive === true;
  }
  if (query.minPrice)
    filter.price = { ...(filter.price || {}), $gte: Number(query.minPrice) };
  if (query.maxPrice)
    filter.price = { ...(filter.price || {}), $lte: Number(query.maxPrice) };

  const [items, total] = await Promise.all([
    Product.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 }),
    Product.countDocuments(filter),
  ]);

  return {
    items,
    meta: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit) || 1,
    },
  };
};

export const getProductById = async (id: string) => {
  if (!Types.ObjectId.isValid(id)) return null;
  return Product.findById(id);
};

export const updateProductById = async (id: string, payload: Partial<any>) => {
  if (!Types.ObjectId.isValid(id)) throw new Error("Invalid product id");
  const updated = await Product.findByIdAndUpdate(id, payload, { new: true });
  return updated;
};

export const softDeleteProductById = async (id: string) => {
  if (!Types.ObjectId.isValid(id)) throw new Error("Invalid product id");
  const updated = await Product.findByIdAndUpdate(
    id,
    { isActive: false },
    { new: true }
  );
  return updated;
};
