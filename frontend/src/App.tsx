import { useEffect, useState } from "react";
import "./App.css";
import { Destination } from "./models/destination";

function App() {
  const [destinations, setDestinations] = useState<Destination[]>([]);

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

  return <>{JSON.stringify(destinations)}</>;
}

export default App;
