import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { FaCartPlus } from "react-icons/fa";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import Loading from "../components/Loading";
import { useFadeAnimations } from "../hooks/useFadeAnimation";

export default function ProductDetail() {
    const { id } = useParams();
    const { addToCart} = useCart();
    const API_URL = import.meta.env.VITE_API_URL;

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const fadeRef = useFadeAnimations([product]);
    
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`${API_URL}/products/${id}`);
                const data = await res.json();
                setProduct(data);
            } catch(err) {
                console.error("Failed to fetch product: ", err);
            } finally {
                setLoading(false);
            }
        }

        fetchProduct();
    }, [id]);

    if (loading) return <Loading />

    if (!product) {
        return <p style={{ padding: "40px" }}>Product not found</p>
    }

    return(
        <div className="app">
        <Navbar />
        <section ref={fadeRef} className="content product-detail">
            <div className="fade-up detail-container">
                <div className="detail-img">
                    <img src={product.image?.url} alt={product.name} />
                </div>

                <div className="detail-info">
                    <h1>{product.name}</h1>
                    <p className="detail-price">&#8358;{product?.price?.toLocaleString()}</p>

                    <p className="detail-category"><strong>Category: </strong>{product.category}</p>

                    <p className="detail-description"><strong>Description: </strong>{product.description || "No description available"}</p>

                    <p className="detail-stock">
                        Stock:{" "}
                        <strong className={`${product.stock > 0 ? "in-stock" : "no-stock"}`}>{product.stock > 0 ? "In Stock" : "Out of Stock"} </strong>
                    </p>

                    <button disabled={!product.stock > 0} onClick={() => addToCart(product)}>{product.stock > 0 ? <FaCartPlus /> : "Out of Stock"}</button>
                </div>
            </div>
        </section>
        <Footer />
    </div>
    );
}