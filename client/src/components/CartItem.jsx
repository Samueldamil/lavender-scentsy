import { useCart } from "../context/CartContext";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import { useNotification } from "../context/NotificationContext";

export default function CartItem({ item }) {
    const { removeFromCart, increaseQty, decreaseQty } = useCart();
    const { notify } = useNotification();

    function handleRemove() {
        removeFromCart(item._id);
        notify(`${item.name} removed from cart`, "error");
    }

    return(
        <div className="cart-item">

            <div className="cart-info">
                <img src={item.image?.url} alt={item.name} />
                <div className="cart-details">
                    <h4>{item.name}</h4>
                    <p>&#8358;{item.price.toLocaleString()}</p>
                </div>
            </div>

            <div className="qty-control">
                <button onClick={() => decreaseQty(item._id)}>
                    <FaMinus />
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => increaseQty(item._id)}>
                    <FaPlus />
                </button>
            </div>

            <button className="remove-cart" onClick={handleRemove}>
                <FaTrash />
            </button>
        </div>
    );
}
