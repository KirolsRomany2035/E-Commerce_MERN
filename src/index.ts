import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute";
import productRoute from "./routes/productRoute";
import { seedInitialProducts } from "./services/productServices";
import carRoure from './routes/cartRoute';
const app = express();
const port = 3001;

app.use(express.json())
mongoose
  .connect("mongodb://localhost:27017/ecommerce")
.then(() => console.log("MongoDB connected!"))
.catch((err) => console.log("Failed to connect!", err));

// Sed The products to the databasee
seedInitialProducts();

app.use('/user', userRoute);
app.use("/products", productRoute);
app.use("/cart", carRoure)
app.listen(port, () => {
  console.log(`Server is running at: http://localhost:${port}`);
}); 

