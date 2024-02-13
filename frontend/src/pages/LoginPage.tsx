import { useState } from "react";
import { BACKEND_URL } from "../constants";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!username || !password) {
            setError("Please fill in all fields");
            return;
        } else {
            try {
                const response = await fetch(`${BACKEND_URL}/api/users/login`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ username, password }),
                });

                if (!response.ok) {
                    const data = await response.json();
                    throw new Error(data.error);
                }

                window.location.href = "/destinations";
            } catch (error) {
                setError((error as Error).message);
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <form className="p-10 bg-white rounded-xl shadow-md" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="username" className="block mb-2 px-24 text-sm font-bold text-gray-700">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-3 py-2 text-sm leading-tight text-primary border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block mb-2 px-24 text-sm font-bold text-gray-700">
                        Password
                    </label>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        id="password"
                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-primary border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    />
                </div>
                {error && <div className="text-red-500 font-bold">{error}</div>}

                <button
                    type="submit"
                    className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded hover:bg-indigo-800 focus:outline-none focus:shadow-outline"
                >
                    Login
                </button>
            </form>
        </div>
    );
}
