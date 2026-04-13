import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePopUp } from "../context/PopUpContext";
import Loading from "../components/Loading";
import { useFadeAnimations } from "../hooks/useFadeAnimation";

export default function OrderDetails() {
    const [order, setOrder] = useState([]);
    const [loading, setLoading] = useState(true);

    const { id } = useParams();
    const { notify } = usePopUp();
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL;

    const fadeRef = useFadeAnimations([order]);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await fetch(`${API_URL}/orders/${id}`);
                
                const data = await res.json();

                setOrder(data);
            } catch (error) {
                notify("Failed to load order", "error");
            } finally {
                setLoading(false);
            }
        }

        fetchOrder();
    }, [id]);

    const updateStatus = async (status) => {
        try {
            const res = await fetch(`${API_URL}/orders/${id}/status`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ status }),
                }
            );

            if (!res.ok) throw new Error();

            notify(`Order ${status} successfully`, "success");

            setTimeout(() => {
                navigate("/orders");
            }, 1500);
        } catch (error) {
            notify("Failed to update order", "error");
        }
    };

    if (loading) return <Loading />

    if (!order) {
        return <p className="error">Order not found</p>
    }

    const isFinal = order.status === "delivered" || order.status === "cancelled";

    return(
        <section ref={fadeRef} className="order-details-page">
            <h2>Order Details</h2>

            <div className="order-grid">

                <div className="fade-left order-left">
                    <div className="order-card">
                        <h3>Customer Info</h3>
                        <p><strong>Name:</strong> {order.user?.name}</p>
                        <p><strong>Email:</strong> {order.user?.email}</p>
                    </div>

                    <div className="order-card">
                        <h3>Shipping Info</h3>
                        <p><strong>Phone:</strong> {order.shippingInfo.phone}</p>
                        <p><strong>Address:</strong> {order.shippingInfo.address}</p>
                        <p><strong>City:</strong> {order.shippingInfo.city}</p>
                    </div>

                    <div className="order-card">
                        <h3>Order Items</h3>
                        {order.orderItems.map(item => (
                            <div key={item.product} className="order-item">
                                <img src={item.image} alt={item.name} />

                                <div>
                                    <p>{item.name}</p>
                                    <p>{item.category}</p>
                                    <p>&#8358;{item.price.toLocaleString()} x {item.quantity}</p>
                                </div>
                                <strong>&#8358;{(item.price * item.quantity).toLocaleString()}</strong>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="fade-right order-right">
                    <div className="order-card">
                        <h3>Order Summary</h3>

                        <p>
                            <strong>Status: </strong>
                            <span className={`status ${order.status}`}>{order.status}</span>
                        </p>
                        <p><strong>Subtotal: </strong> &#8358;{order.subtotal.toLocaleString()}</p>
                        <p><strong>Delivery: </strong> &#8358;{order.deliveryFee.toLocaleString()}</p>

                        <hr />

                        <h2>Total: &#8358;{order.total.toLocaleString()}</h2>
                    </div>

                    {!isFinal && (
                        <div className="order-actions">
                            <button className="complete-btn" onClick={() => updateStatus("delivered")}>Mark as Complete</button>
                            <button className="cancel-btn" onClick={() => updateStatus("cancelled")}>Cancel Order</button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}