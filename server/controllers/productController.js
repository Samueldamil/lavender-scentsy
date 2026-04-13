import Product from "../models/Product.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

export const createProduct = async (req, res) => {
    try {
        const { name, price, stock, category, description } = req.body;

        if (!req.file) {
            return res.status(400).json({ message: "Image is required." });
        }

        if (!name || !price || !stock || !category || !description) {
            return res.status(400).json({ message: "All required field must be provided." });
        }

        const uploadResult = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream({ folder: "lavender-products" }, (error, result) => {
                if (result) resolve(result);
                else reject(error);
            });

            streamifier.createReadStream(req.file.buffer).pipe(stream);
        });
        
        const product = await Product.create({
            name: req.body.name,
            price: req.body.price,
            stock: req.body.stock,
            category: req.body.category,
            description: req.body.description,
            image: {
                url: uploadResult.secure_url,
                public_id: uploadResult.public_id,
            }
        });
        
        res.status(201).json({ message: "Product created successfully!", product });
    } catch(err) {
        console.error("Create product error: ", err);
        res.status(500).json({ message: "Server error..."});
    }
};

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({ isActive: true }).sort({ createdAt: -1 });

        res.status(200).json(products)
    } catch(error) {
        console.error("Get Product error: ". error);
        res.status(500).json({ message: "Failed to fetch products" });
    }
};

export const getSingleProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id);

        if (!product) {
            res.status(404).json({ message: "Product not found." });
        }
        res.status(200).json(product);
    } catch(err) {
        console.error("Get single product error: ", err);
        if (err.name === "CastError") {
            res.status(400).json({ message: "Invalid product ID." });
        };

        res.status(500).json({ message: "Failed to fetch product." });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message: "Product not found." });
        }

        let imageUrl = product.image;

        if (req.file) {
            console.log("Uploading new image...");
            // Deletes old image
            await cloudinary.uploader.destroy(product.image?.public_id);

            // Upload a new image
            const uploadResult = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream({ folder: "lavender-products" }, (error, result) => {
                    if (result) resolve(result);
                    else reject(error);
                });

                stream.end(req.file.buffer);
            })

            imageUrl = { 
                url: uploadResult.secure_url,
                public_id: uploadResult.public_id,
            }
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            id, 
            {
                name: req.body.name,
                price: req.body.price,
                stock: req.body.stock,
                category: req.body.category,
                description: req.body.description,
                image: imageUrl
            }, 
            { new: true, runValidators: true }
        );

        res.status(200).json({message: "Product updated successfully", product: updatedProduct });
    } catch(err) {
        console.error("Update product error: ", err);
        res.status(500).json({ message: "Failed to update product" });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message: "Product not found." });
        }

        if (product.image?.public_id) {
            await cloudinary.uploader.destroy(product.image.public_id);
        }

        await Product.findByIdAndDelete(id);

        res.status(200).json({ message: "Product deleted successfully." });
    } catch(err) {
        console.error("Delete product error: ", err);
        res.status(500).json({ message: "Failed to delete product."});
    }
};

export const getFeaturedProducts = async (req, res) => {
    try {
        const categories = ["men", "women", "kids", "unisex"];

        const products = await Promise.all(categories.map(async (category) => {
            const result = await Product.aggregate([
                { $match: { category }},
                { $sample: { size: 1 }},
            ]);
            return result[0];
        }));

        const filtered = products.filter(Boolean);
        res.status(200).json(filtered);
    } catch (error) {
        console.error("Featured Error: ", error);
        res.status(500).json({ message: "Failed to fetch featured products" });
    }
}

export const searchProducts = async (req, res) => {
   try {
    const keyword = req.query.q;

    const products = await Product.find({
        name: { $regex: keyword, $options: "i" }
    });

    res.status(200).json(products)
   } catch (error) {
    res.status(500).json({ message: "Search Failed" });
   } 
}