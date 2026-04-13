export default function NewCustomers({ users = [] }) {
    return(
        <div className="dashboard-card">
            <h3>New Customers</h3>

            <ul className="list">
                {users.length === 0 ? (
                    <p>No recents users</p>
                ) : users.slice(0, 5).map(user => (
                    <li className="list-item" key={user._id}>
                        <div>
                            <strong>{user.name}</strong>

                            <span className="muted">{user.email}</span>
                        </div>

                        <div>
                            <p className="new-badge">New</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}