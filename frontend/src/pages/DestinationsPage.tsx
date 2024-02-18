import "../App.css";
import { Link } from "react-router-dom";

export default function DestinationsPage() {
    return (
        <div className="flip-card" style={{ width: "300px", height: "300px" }}>
            <div className="flip-card-inner">
                <div
                    className="flip-card-front bg-blue-500 text-white flex items-center justify-center"
                    style={{ width: "300px", height: "300px" }}
                >
                    Front
                </div>
                <div
                    className="flip-card-back bg-red-500 text-white flex items-center justify-center"
                    style={{ width: "300px", height: "300px" }}
                >
                    Back
                    <Link to={"/add"}>fuk sumn</Link>
                </div>
            </div>
        </div>
    );
}
