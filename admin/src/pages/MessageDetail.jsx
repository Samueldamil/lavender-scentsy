import { useState } from "react";
import { useParams } from "react-router-dom";
import { MdSend } from "react-icons/md";

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

export default function MessageDetail() {
    const { id } = useParams();
    const message = messages.find(msg => msg.id === Number(id));
    const [reply, setReply]= useState("");

    if (!message) return <p>Message not found.</p>

    function handleReply() {
        if (!reply.trim()) return;

        console.log("Reply Sent: ", reply);
        setReply("");
        alert("Reply sent!")
    }

    return(
        <div className="message-detail-page">
            <h2>Message from {message.name}</h2>

            <p className="msg-detail-email">{message.email}</p>
            <p className="msg-detail-date">{message.date}</p>
            
            <div className="msg-content-wrapper">
                <div className="msg-detail-content">
                <p>{message.message}</p>
            </div>
            </div>

            <div className="reply-section">
                <textarea placeholder="Type your reply..." value={reply} onChange={(e) => setReply(e.target.value)}></textarea>
                <button onClick={handleReply}><MdSend /></button>
            </div>
        </div>
    )
}