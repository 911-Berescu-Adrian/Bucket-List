import React from "react";
import { Destination as DestinationModel } from "../models/destination";

interface DestinationProps {
    destination: DestinationModel;
}

export default function Destination({ destination }: DestinationProps) {
    return (
        <>
            <h2>{destination.title}</h2>
            <p>{destination.description}</p>
            <p>{destination.geolocation}</p>
            <p>{destination.start_date}</p>
            <p>{destination.end_date}</p>
            <img src={destination.image} alt={destination.title} />
        </>
    );
}
