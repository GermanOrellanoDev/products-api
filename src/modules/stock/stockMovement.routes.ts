import { Router } from "express";
import {
  createMovement,
  exportMovementsCSV,
  getMovementsByProduct,
} from "./stockMovement.controller";

const router = Router();

router.post("/", createMovement);

/**
 * @swagger
 * /api/stock-movements/product/{productId}:
 *   get:
 *     summary: Get stock movements by product
 *     tags: [Stock Movements]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of stock movements
 */
router.get("/product/:productId", getMovementsByProduct);

/**
 * @swagger
 * /api/stock-movements/product/{productId}/export:
 *   get:
 *     summary: Export stock movements to CSV
 *     tags: [Stock Movements]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: CSV file
 *         content:
 *           text/csv:
 *             schema:
 *               type: string
 */
router.get("/product/:productId/export", exportMovementsCSV);

export default router;
