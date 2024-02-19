import { useState } from "react";
import { useLoginStore } from "../store/LoginStore";
import { BACKEND_URL } from "../constants";
import { Link, useNavigate } from "react-router-dom";

export default function AddDestinationPage() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [isPublic, setIsPublic] = useState(false);
    const [error, setError] = useState("");
    const { username } = useLoginStore();
    const navigate = useNavigate();

    const handleSubmit = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        if (startDate > endDate) {
            setError("Start date cannot be after end date");
            return;
        }
        if (!title || !description || !startDate || !endDate) {
            setError("All fields are required");
            return;
        }
        const response = await fetch(BACKEND_URL + "/api/destinations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({
                title,
                description,
                startDate,
                endDate,
                isPublic,
                username,
            }),
        });
        const data = await response.json();
        if (response.ok) {
            setError("");
            navigate("/destinations");
        } else {
            setError(data.message);
        }
    };

    return (
        <div className="flex justify-between items-center">
            <Link to="/destinations" className="text-blue-500 hover:text-blue-700 top-40 right-2/3 absolute">
                Back
            </Link>
            <div className="flex flex-col items-center justify-center min-h-screen  py-2">
                <div className="p-6  rounded shadow-md w-full max-w-lg">
                    <h1 className="text-2xl font-bold mb-4">Add Destination</h1>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block">Title:</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                            />
                        </div>
                        <div>
                            <label className="block">Description:</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                            />
                        </div>
                        <div>
                            <label className="block">Start Date:</label>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                            />
                        </div>
                        <div>
                            <label className="block">End Date:</label>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                            />
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                checked={isPublic}
                                onChange={(e) => setIsPublic(e.target.checked)}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label className="ml-2 block">Public</label>
                        </div>
                        <p className="text-red-500">{error}</p>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Add Destination
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
