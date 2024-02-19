import { useState } from "react";
import { MdAccountCircle } from "react-icons/md";
import { useLoginStore } from "../store/LoginStore";
import { BACKEND_URL } from "../constants";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = async () => {
        try {
            const response = await fetch(BACKEND_URL + "/api/users/logout", {
                method: "POST",
            });
            if (!response.ok) {
                throw new Error("Logout failed");
            }
            console.log("Logged out");
            useLoginStore.getState().logOut();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="fixed top-0  w-5/6 z-50 backdrop-blur-sm flex justify-between items-center p-4 mb-10">
            <h1 className="ml-[-8rem]">Destination Bucket List</h1>
            <div className="relative">
                <div className="flex items-center cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                    <MdAccountCircle size={24} />
                    <UserProfile />
                </div>
                {isOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg py-2 z-10">
                        <a
                            onClick={handleLogout}
                            className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
                        >
                            Logout
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}

function UserProfile() {
    const { username } = useLoginStore();
    return (
        <div className="ml-2 text-xl">
            <p>{username}</p>
        </div>
    );
}
