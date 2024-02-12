import { useEffect, useState } from "react";
import "./App.css";
import { Destination as DestinationModel } from "./models/destination";
import Destination from "./components/Destination";

function App() {
    const [destinations, setDestinations] = useState<DestinationModel[]>([]);

    useEffect(() => {
        async function fetchDestinations() {
            try {
                const response = await fetch("http://localhost:3000/api/destinations", {
                    method: "GET",
                });
                const destinations = await response.json();
                setDestinations(destinations);
            } catch (error) {
                console.error(error);
                alert(error);
            }
        }
        fetchDestinations();
    }, []);

    return (
        <>
            <h1>Destinations</h1>
            <ul>
                {destinations.map((destination) => (
                    <li key={destination._id}>
                        <Destination destination={destination} />
                    </li>
                ))}
            </ul>
        </>
    );
}

export default App;
