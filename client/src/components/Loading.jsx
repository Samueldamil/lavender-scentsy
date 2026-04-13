import loadingImg from "../assets/loading-perfume.png";

export default function Loading() {
    return (
        <div className="loading-container">
            <img src={loadingImg} alt="Loading..." className="loader" />
        </div>
    );
};