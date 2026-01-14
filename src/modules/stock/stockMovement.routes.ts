import { Router } from "express";
import {
  createMovement,
  getMovementsByProduct,
} from "./stockMovement.controller";

const router = Router();

router.post("/", createMovement);
router.get("/product/:productId", getMovementsByProduct);

export default router;
