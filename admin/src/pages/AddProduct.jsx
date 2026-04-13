import { useState, useRef } from "react";
import { usePopUp } from "../context/PopUpContext";
import { useNavigate } from "react-router-dom";
import { useFadeAnimations } from "../hooks/useFadeAnimation";

export default function AddProduct() {
    const navigate = useNavigate();
    const { notify } = usePopUp();
    const API_URL = import.meta.env.VITE_API_URL;
    const fileInputRef = useRef(null);

    const fadeRef = useFadeAnimations();
    
    const [product, setProduct] = useState({
        name: "",
        price: "",
        description: "",
        category: "",
        stock: "",
        image: "",
    });
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    function handleImageUpload(e) {
        const file = e.target.files[0];

        if (!file) return;

        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    }

    function handleChange(e) {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formDataToSend = new FormData();
            
            formDataToSend.append("name", product.name);
            formDataToSend.append("price", product.price);
            formDataToSend.append("stock", product.stock);
            formDataToSend.append("category", product.category);
            formDataToSend.append("description", product.description);
            formDataToSend.append("image", imageFile);

            console.log("Submitting...")

            const res = await fetch(`${API_URL}/products`, {
                method: "POST",
                body: formDataToSend,
            });

            console.log("Response received", res)
            
            if (!res.ok) {
                const existError = await res.text();
                console.log("Server Error", existError)
                throw new Error("Failed to add product.");
            }

            console.log("Success block reached.")
            
            notify("Product added successfully.", "success");
            setProduct({
                name: "",
                price: "",
                description: "",
                category: "",
                stock: "",
            });
            setImageFile(null);
            setImagePreview(null)
            fileInputRef.current.value = "";

            await res.json();
            navigate("/products");
        } catch (err) {
            notify("Something went wrong", "error");
        } finally {
            setLoading(false);
        }
    }

    return(
        <div ref={fadeRef} className="add-product">
            <h2>Add New Product</h2>

            <form className="fade-up add-product-form" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="name" 
                    placeholder="Product Name"
                    value={product.name}
                    onChange={handleChange} 
                    required 
                />

                <div className="price-input">
                    <span>&#8358;</span>
                    <input 
                        type="number" 
                        min="0" 
                        name="price" 
                        placeholder="Price"
                        value={product.price} 
                        onChange={handleChange} 
                        required 
                    />
                </div>

                <select name="category" value={product.category} onChange={handleChange} required>
                    <option value="">Select Category</option>
                    <option value="unisex">Unisex</option>
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                    <option value="kids">Kids</option>
                </select>

                <input 
                    type="number" 
                    min="0" 
                    name="stock" 
                    placeholder="Stock Quantity"
                    value={product.stock}
                    onChange={handleChange} 
                    required 
                />

                <div className="image-upload">

                    <input 
                        name="image" 
                        type="file"
                        id="imageUpload"
                        accept="image/*" 
                        onChange={handleImageUpload}
                        ref={fileInputRef}
                        required 
                        hidden
                    />

                    <label htmlFor="imageUpload" className="custom-upload-btn">Upload Product Image</label>

                    {imagePreview && (
                        <img src={imagePreview} alt="Preview" className="image-preview" />
                    )}
                </div>

                <textarea 
                    name="description" 
                    placeholder="Product Description"
                    value={product.description}
                    onChange={handleChange} 
                    required 
                />

                <button type="submit" disabled={loading}>{loading ? "Adding..." : "Add Product"}</button>
            </form>
        </div>
    )
}