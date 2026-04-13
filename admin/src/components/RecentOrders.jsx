export default function RecentOrders({ orders = [] }) {
    return(
        <div className="dashboard-card">
            <h3>Recent Orders</h3>

            <ul className="list">
                {orders.length === 0 ? (
                    <p>No recent orders</p>
                ) : orders.slice(0, 5).map((order) => (
                    <li key={order._id} className="list-item">
                        <div>
                            <strong>{order.user?.name}</strong>
                            <span className="muted">{order._id.slice(-6)}</span>
                        </div>
                            
                        <div className="order-right">
                            <span>&#8358;{order.total.toLocaleString()}</span>
                            <span className={`status ${order.status.toLowerCase()}`}>{order.status}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}