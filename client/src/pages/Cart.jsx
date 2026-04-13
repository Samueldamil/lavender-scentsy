import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNotification } from "../context/NotificationContext";
import { useFadeAnimations } from "../hooks/useFadeAnimation";
import Footer from "../components/Footer";

export default function Cart() {
    const { cart } = useCart();
    const { token } = useAuth();
    const navigate = useNavigate();
    const { notify } = useNotification();
    const fadeRef = useFadeAnimations();

    const deliveryFee = 2000;

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const total = subtotal + deliveryFee;

    function handleCheckout() {
        if (!token) {
            notify("Please login to continue checkout.", "error");
            navigate("/login");
            return;
        }
        navigate("/checkout");
    }

    return(
        <div className="app">
            <Navbar />
            <section ref={fadeRef} className="content cart-page">
                <h1 className="fade-left">Your Cart</h1>

                {cart.length === 0 ? (
                    <p>Your cart is empty</p>
                ) : (
                    <>
                        <div className="fade-up cart-list">
                            {cart.map(item => (
                                <CartItem key={item.id} item={item} />
                            ))}
                        </div>

                        <div className="cart-receipt">
                            <h3>Order Summary</h3>

                            <div className="receipt-divider"></div>

                            <div className="receipt-line">
                                <span>Subtotal</span>
                                <span>&#8358;{subtotal.toLocaleString()}</span>
                            </div>

                            <div className="receipt-line">
                                <span>Delivery Fee</span>
                                <span>&#8358;{deliveryFee.toLocaleString()}</span>
                            </div>

                            <div className="receipt-divider"></div>

                            <div className="receipt-total">
                                <strong>Total</strong>
                                <strong>&#8358;{total.toLocaleString()}</strong>
                            </div>
                            
                            <button onClick={handleCheckout} className="checkout-btn">Checkout</button>
                        </div>
                    </>
                )}
            </section>
            <Footer />
        </div>
    );
}