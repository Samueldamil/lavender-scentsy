import { useState, useEffect, useRef } from "react";
import { usePopUp } from "../context/PopUpContext";
import { useParams, useNavigate } from "react-router-dom";
import { useFadeAnimations } from "../hooks/useFadeAnimation";

export default function EditProduct() {
    const navigate = useNavigate();
    const { notify } = usePopUp();
    const { id } = useParams();
    const API_URL = import.meta.env.VITE_API_URL;
    const fileInputRef = useRef(null);

    const fadeRef = useFadeAnimations();

    const [formData, setFormData] = useState({
        name: "",
        price: "",
        category: "",
        stock: "",
        description: "",
        image: null,
    });
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`${API_URL}/products/${id}`);
                const data = await res.json();

                setFormData(data);
                setImagePreview(data.image?.url);
            } catch(err) {
                console.error(err);
            }
        };

        fetchProduct();
    }, [API_URL, id])

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    function handleImageChange(e) {
        const file = e.target.files[0];

        if (!file) return;

       setImageFile(file);
       setImagePreview(URL.createObjectURL(file));
    }

    const handleSubmit = async (e) => {
         e.preventDefault();
        setLoading(true);

        try {
            const formNewData = new FormData();

            formNewData.append("name", formData.name);
            formNewData.append("price", formData.price);
            formNewData.append("stock", formData.stock);
            formNewData.append("category", formData.category);
            formNewData.append("description", formData.description);

            if (imageFile) {
                formNewData.append("image", imageFile);
            }

            const res = await fetch(`${API_URL}/products/${id}`, {
                method: "PUT",
                body: formNewData,
            });

            if (!res.ok) throw new Error("Failed to update product.");

            notify("Product updated successfully", "success");
            navigate("/products");
        } catch(err) {
            console.error("Something went wrong", err);
            notify("Update product error", "error");
        } finally {
            setLoading(false);
        }
    }

    return(
        <div ref={fadeRef} className="add-product">
            <h2>Edit Product</h2>

            <form className="fade-up add-product-form" onSubmit={handleSubmit}>
                <input type="text" name="name" value={formData.name} placeholder="Product Name" onChange={handleChange} />
                <div className="price-input">
                    <span>&#8358;</span>
                    <input type="number" min="0" value={formData.price} name="price" placeholder="Price" onChange={handleChange} />
                </div>
                <select name="category" value={formData.category} onChange={handleChange}>
                    <option value="unisex">Unisex</option>
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                    <option value="kids">Kids</option>
                </select>
                <input type="number" min="0" value={formData.stock} name="stock" placeholder="Stock Quantity" onChange={handleChange} />
                <div className="image-upload">

                    <input 
                        name="image" 
                        type="file"
                        id="imageUpload"
                        ref={fileInputRef}
                        accept="image/*" 
                        onChange={handleImageChange} 
                        hidden
                    />

                    <label htmlFor="imageUpload" className="custom-upload-btn">Upload Product Image</label>

                    {imagePreview && (
                        <img src={imagePreview} alt="Preview" className="image-preview" />
                    )}
                </div>
                <textarea name="description" value={formData.description} placeholder="Product Description" onChange={handleChange}></textarea>

                <button type="submit" disabled={loading}>
                    {loading ? "Updating..." : "Update product"}
                </button>
            </form>
        </div>
    )
}