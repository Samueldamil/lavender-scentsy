import { useState } from "react";

const notifications = [
    {
        id: 1,
        type: "order",
        message: "New order #ORD001 placed by John Doe",
        date: "Today, 10:30 AM",
        read: false,
    },
    {
        id: 2,
        type: "system",
        message: "Low stock alert: Dior Sauvage",
        date: "Today, 09:45 AM",
        read: false,
    },
    {
        id: 3,
        type: "order",
        message: "New order #ORD002 placed by Aisha Bello",
        date: "Yesterday, 05:00 PM",
        read: true,
    },
]

export default function Notification() {
    const [notes, setNotes] = useState(notifications);

    function markAsRead(id) {
        setNotes(prev => prev.map(n => (
            n.id === id ? { ...n, read: true } : n
        )));
    };

    return(
        <div className="notification-page">
            <h2>Notification</h2>

            <div className="notification-list">
                {notes.map(note => (
                    <div key={note.id} className={`notification-card ${note.read ? "read" : "unread"} ${note.type}`} onClick={() => markAsRead(note.id)}>
                        <p className="notification-message">{note.message}</p>
                        <p className="notification-date">{note.date}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}