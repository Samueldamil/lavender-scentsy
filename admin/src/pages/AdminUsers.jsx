import { useState, useEffect } from "react";
import { usePopUp } from "../context/PopUpContext";
import Loading from "../components/Loading";
import { FaTrash } from "react-icons/fa";
import { useFadeAnimations } from "../hooks/useFadeAnimation";

export default function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deletingUserId, setDeletingUserId] = useState(null);
    const [updatingRoleId, setUpdatingRoleId] = useState(null);
    const [search, setSearch] = useState("");

    const API_URL = import.meta.env.VITE_API_URL;
    const { notify } = usePopUp();

    const isReady = users.length > 0
    const fadeRef = useFadeAnimations([isReady]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch(`${API_URL}/users`);
                const data = await res.json();
                setUsers(data);
            } catch(err) {
                console.error(err);
                notify("Failed to fetch users", "error");
            } finally {
                setLoading(false);
            }
        }

        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this user?")) return;
        setDeletingUserId(id);

        try {
            await fetch(`${API_URL}/users/${id}`, {
                method: "DELETE",
            });
            setUsers(users.filter((u) => u._id !== id));
            notify("User deleted successfully", "success");
        } catch(err) {
            console.error(err);
            notify("Delete Failed", "error");
        } finally {
            setDeletingUserId(null);
        }
    };

    const handleRoleChange = async (id, newRole) => {
        setUpdatingRoleId(id);

        try {
            const res = await fetch(`${API_URL}/users/${id}/role`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ role: newRole }),
            });
            const updatedUser = await res.json();

            setUsers(users.map((u) => (u._id === id ? updatedUser.user : u)));
            notify("Role updated successfully", "success");
        } catch(err) {
            console.error(err);
            notify("Update role failed", "error");
        } finally {
            setUpdatingRoleId(null);
        }
    };

    if (loading) return <Loading />

    return (
        <div ref={fadeRef} className="admin-users-page">
            <div className="admin-users-header">
                <h2>Users</h2>

                <p>Total users({users.length})</p>
            </div>

            <input 
                type="text"
                className="user-search-input"
                placeholder="Search by name or email"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <div className="fade-down table-container">
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length === 0 ? (
                            <tr>
                                <td colSpan="4" style={{ textAlign: "center", padding: "20px" }}>No users found</td>
                            </tr>
                        ) : (
                            users.filter((u) => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())).map((u) => (
                                <tr key={u._id}>
                                    <td>{u._id.slice(0, 8)}</td>
                                    <td>{u.name}</td>
                                    <td>{u.email}</td>
                                    <td>
                                        <select value={u.role} disabled={updatingRoleId === u._id} onChange={(e) => handleRoleChange(u._id, e.target.value)}>
                                            <option value="client">Client</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    </td>
                                    <td>
                                        <button className="user-delete" onClick={() => handleDelete(u._id)}>
                                            {deletingUserId === u._id ? (
                                                <span className="delete-spinner"></span>
                                            ) : (
                                                <FaTrash />
                                            )}
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}