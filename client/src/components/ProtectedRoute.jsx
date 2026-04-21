import { Navigate } from "react-router-dom";
import { useNotification } from "../context/NotificationContext";
import { useAuth } from "../context/AuthContext";
import Loading from "./Loading";

export default function ProtectedRoute({ children }) {
    const { token, loading } = useAuth();
    const { notify } = useNotification();

    if (loading) return <Loading />;

    if (!token) {
        notify("Please register or login first", "error");
        return <Navigate to="/login" replace />;
    }

    return children;
}