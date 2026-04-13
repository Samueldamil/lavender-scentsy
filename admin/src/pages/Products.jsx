import { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { usePopUp } from "../context/PopUpContext";
import Loading from "../components/Loading";
import { useFadeAnimations } from "../hooks/useFadeAnimation";

export default function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState(null);

    const navigate = useNavigate();
    const { notify } = usePopUp();

    const isReady = products.length > 0;
    const fadeRef = useFadeAnimations([isReady]);

    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                
                const res = await fetch(`${API_URL}/products`);
                if (!res.ok) {
                    throw new Error("Failed to fetch products.");
                }
                const data = await res.json();
                setProducts(data);
            } catch(err) {
                notify("Failed to fetch product", "error");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [API_URL]);

    if (loading) {
        return <Loading />
    }

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this product?");

        if (!confirmDelete) return;

        try {
            setDeletingId(id);

            const res = await fetch(`${API_URL}/products/${id}`, {
                method: "DELETE",
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message);
            }

            notify("Product deleted successfully", "success");

            setProducts(prev => prev.filter(product => product._id !== id));
        } catch(err) {
            console.error(err);
            notify("Failed to delete product", "error");
        } finally {
            setDeletingId(null);
        }
    }

    return(
        <div ref={fadeRef} className="products-page">
            <div className="fade-down products-header">
                <h2>Products</h2>
                <Link to="/add-product" className="add-btn">
                    <FaPlus /> Add Product
                </Link>
            </div>

            <div className="fade-up table-container">
                <table className="product-table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.length === 0 ? (
                            <tr>
                                <td style={{ padding: "20px", textAlign: "center" }}>No products found</td>
                            </tr>
                        ) : (
                            products.map((product) => {
                                const inStock = product.stock > 0;
                                return (
                                    <tr key={product._id}>
                                        <td><img className="product-image" src={product.image?.url} alt={product.name} /></td>
                                        <td>{product.name}</td>
                                        <td>{product.description}</td>
                                        <td>{product.category}</td>
                                        <td>{product.price}</td>
                                        <td>{product.stock}</td>
                                        <td className={`${inStock ? "in-stock" : "out-stock"}`}>
                                            {inStock ? "In Stock" : "Out of Stock"}
                                        </td>
                                        <td className="actions">
                                            <button className="edit" onClick={() => navigate(`/products/edit/${product._id}`)}>
                                                <FaEdit />
                                            </button>
                                            <button className="delete" onClick={() => handleDelete(product._id)}>
                                                {deletingId === product._id ? (
                                                    <span className="delete-spinner"></span>
                                                ) : (
                                                    <FaTrash />
                                                )}
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}