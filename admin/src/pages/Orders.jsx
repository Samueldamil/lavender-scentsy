import { Link } from "react-router-dom"
import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import { usePopUp } from "../context/PopUpContext";
import { useFadeAnimations } from "../hooks/useFadeAnimation";

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const API_URL = import.meta.env.VITE_API_URL;
    const { notify } = usePopUp();

    const isReady = orders.length > 0;
    const fadeRef = useFadeAnimations([isReady]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await fetch(`${API_URL}/orders`);
                
                if (!res.ok) {
                    throw new Error("Failed to fetch orders");
                }

                const data = await res.json();
                setOrders(data);
            } catch (error) {
                notify("Failed to fetch orders", "error");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [API_URL]);

    if (loading) {
        return <Loading />
    }
    
    return(
        <div ref={fadeRef} className="orders-page">
            <h2>Orders</h2>

            <div className="fade-up table-wrapper">
                <table className="orders-table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id}>
                                <td>{order._id.slice(-6)}</td>
                                <td>{order.user?.name} <br /> {order.user?.email}</td>
                                <td>&#8358;{order.total.toLocaleString()}</td>
                                <td className={`status ${order.status}`}>{order.status}</td>
                                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                <td>
                                    <Link to={`/orders/${order._id}`}>
                                        <button>View</button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}