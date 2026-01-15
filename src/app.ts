import express from "express";
import cors from "cors";
import morgan from "morgan";
import productsRoutes from "./modules/products/product.routes";
import stockMovementRoutes from "./modules/stock/stockMovement.routes";
import { errorHandler } from "./middleware/error.middleware";
import { swaggerSpec } from "./config/swagger";
import swaggerUi from "swagger-ui-express";

const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api", productsRoutes);
app.use("/api/stock-movements", stockMovementRoutes);

app.use(errorHandler);

app.get("/", (req, res) => {
  res.json({ service: "products-api", status: "corriendo" });
});

export default app;
