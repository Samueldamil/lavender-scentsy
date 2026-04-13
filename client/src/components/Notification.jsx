export default function Notification({ message, type, show }) {
    if (!show) return null;

    return(
        <div className={`notification ${type}`}>
            {message}
        </div>
    );
}