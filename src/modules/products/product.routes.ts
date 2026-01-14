import { Router } from "express";
import { body, param, query, validationResult } from "express-validator";
import {
  createProduct,
  listProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from "./product.controller";
import { authenticate } from "../../middleware/auth.middleware";
import { authorize } from "../../middleware/role.middleware";

const router = Router();

const validate = (req: any, res: any, next: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  next();
};

router.get(
  "/",
  [
    query("page").optional().isInt({ min: 1 }).toInt(),
    query("limit").optional().isInt({ min: 1, max: 100 }).toInt(),
    query("search").optional().isString(),
    query("category").optional().isString(),
    query("minPrice").optional().isFloat().toFloat(),
    query("maxPrice").optional().isFloat().toFloat(),
    query("isActive").optional().isBoolean().toBoolean(),
  ],
  validate,
  listProducts
);
router.get("/:id", [param("id").isMongoId()], validate, getProduct);
router.post(
  "/",
  authenticate,
  authorize(["ADMIN"]),
  [
    body("name").isString().isLength({ min: 2 }),
    body("sku").optional().isString(),
    body("quantity").isInt({ min: 0 }).toInt(),
    body("stock").isInt({ min: 0 }).toInt(),
    body("price").isFloat({ min: 0 }).toFloat(),
    body("category").optional().isString(),
    body("description").optional().isString(),
  ],
  validate,
  createProduct
);
router.put(
  "/:id",
  authenticate,
  authorize(["ADMIN"]),
  [
    param("id").isMongoId(),
    body("name").optional().isString().isLength({ min: 2 }),
    body("sku").optional().isString(),
    body("quantity").optional().isInt({ min: 0 }).toInt(),
    body("price").optional().isFloat({ min: 0 }).toFloat(),
    body("category").optional().isString(),
    body("description").optional().isString(),
  ],
  validate,
  updateProduct
);
router.delete(
  "/:id",
  authenticate,
  authorize(["ADMIN"]),
  [param("id").isMongoId()],
  validate,
  deleteProduct
);

export default router;
