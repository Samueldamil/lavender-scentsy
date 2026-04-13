import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import Loading from "./Loading";
import { useFadeAnimations } from "../hooks/useFadeAnimation";

export default function ClientProducts({ category }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const API_URL = import.meta.env.VITE_API_URL;

    const isReady = products.length > 0;
    const fadeRef = useFadeAnimations([isReady]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true)

                const res = await fetch(`${API_URL}/products`);
                if (!res.ok) {
                    throw new Error("Failed to fetch products.");
                }
                const data = await res.json()

                const filtered = category ? data.filter(p => p.category === category) : data;
                setProducts(filtered);
            } catch(err) {
                setError(err.message || "Something went wrong.");
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, [API_URL, category]);

    if (loading) return <Loading />;
    if (error) return <p style={{ color: "red", display: "flex", justifyContent: "center", alignItems: "center" }}>{error}</p>;
    if (products.length === 0) return <p>No products found.</p>;

    return (
        <div ref={fadeRef} className="products-grid">
            {products.map(product => (
                <ProductCard product={product} key={product._id} />
            ))}
        </div>
    );
}