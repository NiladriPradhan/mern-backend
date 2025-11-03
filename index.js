import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDb } from "./utils/db.js";
import AuthRouter from "./routes/auth/auth-routes.js";
import adminProductsRouter from "./routes/admin/products-routes.js"
import shopProductsRouter from "./routes/shop/produts-routes.js"
import { addProduct, fetchAllProducts } from "./controllers/admin/product-controllers.js";

import  cartRoutes from "./routes/cart/cartRoutes.js"

dotenv.config();

const app = express();


app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: [
            'Content-Type',
            'Authorization',
            'Cache-Control',
            'Expires',
            'Pragma'
        ],
        credentials: true,
    })
)

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", AuthRouter);
app.use("/api/admin/products", adminProductsRouter)
// product api routes
app.use("/api/admin/products", addProduct);
app.use("/api/admin/products", fetchAllProducts);

// filter products
app.use("/api/shop/products",shopProductsRouter)

//cart routes
app.use("/api/shop/cart", cartRoutes);


connectDb();

app.get("/", (req, res) => {
    res.send("hello from backend")
})

app.listen(process.env.PORT || 4500, () => {
    console.log("server running on port 4000");

})