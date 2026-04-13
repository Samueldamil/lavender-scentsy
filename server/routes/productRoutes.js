import express from "express";
import { 
    createProduct, 
    deleteProduct, 
    getProducts, 
    getSingleProduct, 
    updateProduct, 
    getFeaturedProducts,
    searchProducts } from "../controllers/productController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/featured", getFeaturedProducts);
router.get("/search", searchProducts);
router.get("/:id", getSingleProduct);
router.post("/", upload.single("image"), createProduct);
router.put("/:id", upload.single("image"), updateProduct);
router.delete("/:id", deleteProduct);

export default router;