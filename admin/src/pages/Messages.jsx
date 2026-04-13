import { NavLink } from "react-router-dom";

const messages = [
    {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        message: "Hi, I want to know if Dior Sauvage is available.",
        date: "Today",
        unread: true,
    },
    {
        id: 2,
        name: "Aishat Bello",
        email: "aishat@example.com",
        message: "Do you deliver outside Lagos?",
        date: "Yesterday",
        unread: false,
    },
    {
        id: 3,
        name: "Michael James",
        email: "michael@example.com",
        message: "Please, how long does delivery take?",
        date: "2 days ago",
        unread: true,
    },
]

export default function Messages() {
    return(
        <div className="messages-page">
            <h2>Messages</h2>

            <div className="messages-list">
                {messages.map(message => (
                    <NavLink to={`/messages/${message.id}`} key={message.id}>
                        <div className={`message-card ${message.unread ? "unread" : ""}`}>
                            <div className="message-header">
                                <strong>{message.name}</strong>
                                <span className="msg-date">{message.date}</span>
                            </div>
                            <p className="msg-email">{message.email}</p>
                            <p className="msg-preview">{message.message}</p>
                        </div>
                    </NavLink>
                ))}
            </div>
        </div>
    );
}