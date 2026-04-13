import { FaCartPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useNotification } from "../context/NotificationContext";

export default function ProductCard({ product }) {
    const isOutOfStock = product.stock <= 0;
    const { cart, addToCart } = useCart();
    const { notify } = useNotification();

    function handleAdd() {
        const existing = cart.find(item => item._id === product._id);
        addToCart(product);

        if (existing) {
            notify(`${product.name} quantity increased in cart.`, "success");
        } else {
            notify(`${product.name} added to cart.`, "success");
        }
    }

    return(
        <div className={`product-card zoom-in ${isOutOfStock ? "out-of-stock" : ""}`}>
            <Link to={`/product/${product._id}`}>
                <img src={product.image?.url} alt={product.name} />
            </Link>

            <div className="product-info">
                <h3>{product.name}</h3>
                <div className="product-footer">
                    <p className="price">&#8358;{product.price.toLocaleString()}</p>
                    <button disabled={isOutOfStock} onClick={handleAdd}>{isOutOfStock ? "Out of Stock" : <FaCartPlus />}</button>
                </div>
            </div>
        </div>
    );
}