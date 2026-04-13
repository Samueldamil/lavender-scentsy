import { useContext, createContext, useState } from "react";
import Notification from "../components/Notification";

const NotificationContext = createContext(null);

export default function NotificationProvider({ children }) {
    const [notification, setNotification] = useState({
        message: "",
        type: "success",
        show: false
    });

    function notify(message, type = "success") {
        setNotification({ message, type, show: true });

        setTimeout(() => {
            setNotification(n => ({ ...n, show: false }));
        }, 3000);
    };

    return(
        <NotificationContext.Provider value={{ notify }}>
            {children}
            <Notification {...notification} />
        </NotificationContext.Provider>
    );
}

export function useNotification() {
    return useContext(NotificationContext);
}