import express from "express";
import cors from "cors";
import morgan from "morgan";
import productsRoutes from "./modules/products/product.routes";
import { errorHandler } from "./middleware/error.middleware";

const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api", productsRoutes);

app.use(errorHandler);

app.get("/", (req, res) => {
  res.json({ service: "products-api", status: "corriendo" });
});

export default app;
