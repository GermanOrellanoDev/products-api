import { Router } from "express";
import {
  createMovement,
  exportMovementsCSV,
  getMovementsByProduct,
} from "./stockMovement.controller";

const router = Router();

router.post("/", createMovement);
router.get("/product/:productId", getMovementsByProduct);
router.get("/product/:productId/export", exportMovementsCSV);

export default router;
