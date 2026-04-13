import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { MdSearch } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../context/NotificationContext";
import Loading from "../components/Loading";

export default function Search() {
    const [products, setProducts] = useState([]);
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);


    const API_URL = import.meta.env.VITE_API_URL;
    const { notify } = useNotification();
    const navigate = useNavigate();

    useEffect(() => {
        if (!query.trim()) {
            setProducts([]);
        }
    }, [query]);

    const handleSearch = async (e) => {
        e.preventDefault();

       const formData = new FormData(e.target);
        const searchValue = formData.get("search");

        if (!searchValue.trim()) return;

        try {
            setLoading(true);

            const res = await fetch(`${API_URL}/products/search?q=${query}`);

            const data = await res.json();
            setProducts(data);
            navigate(`/search?q=${query}`);
        } catch (error) {
            console.log(error);
            notify("Product search failed", "error");
        } finally {
            setLoading(false);
        }
    }

    function handleChange(e) {
        setQuery(e.target.value);
    }

    return (
        <div className="app">
            <Navbar />
            <section className="content search-page">
                <h1>Search</h1>

                <form onSubmit={handleSearch} className="search-bar">
                    <input
                        className="search-input"
                        name="search"
                        placeholder="Search perfumes..."
                        value={query}
                        onChange={handleChange}
                    />

                    <button type="submit">
                        <MdSearch />
                    </button>
                </form>

                <h2>Results for {query ? `${query}` : "..."}</h2>

                {!query ? (
                    <p>Start typing to search products...</p>
                    ) : loading ? (
                    <Loading />
                ) : (
                    <div className="search-grid">
                        {products.length > 0  ? (
                            products.map(product => (
                                <ProductCard key={product._id} product={product} />
                            ))
                        ) : (
                            <p>No product found</p>
                        )}
                    </div>
                )}
            </section>
            <Footer />
        </div>
    );
}