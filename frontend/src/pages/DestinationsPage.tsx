import "../App.css";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BACKEND_URL } from "../constants";
import { Destination } from "../models/destination";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function DestinationsPage() {
    const [publicDestinations, setPublicDestinations] = useState<Destination[]>([]);
    const [privateDestinations, setPrivateDestinations] = useState<Destination[]>([]);
    const [isPublic, setIsPublic] = useState<boolean>(true);

    const queryClient = useQueryClient();

    const { isPending, error, data } = useQuery({
        queryKey: ["destinations"],
        queryFn: () => fetch(BACKEND_URL + "/api/destinations").then((res) => res.json()),
    });

    const destMutation = useMutation({
        mutationFn: (id: string) => fetch(BACKEND_URL + "/api/destinations/" + id, { method: "DELETE" }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["destinations"] });
        },
    });

    useEffect(() => {
        if (data === undefined) return;
        console.log(data);
        if (isPublic) {
            setPublicDestinations(data.filter((destination: Destination) => destination.isPublic === true));
        } else {
            setPrivateDestinations(data.filter((destination: Destination) => destination.isPublic === false));
        }
    }, [data]);

    if (isPending) return "Loading...";

    if (error) return "An error has occurred: " + error.message;

    const handleCityClick = (id: string) => {
        console.log("clicked", id);
    };

    const handleRemove = async (id: string) => {
        destMutation.mutate(id);
    };

    return (
        <>
            <div className="flex mt-12 gap-2 [&>*]:text-2xl [&>*]:font-bold [&>*]:cursor-pointer">
                <a onClick={() => setIsPublic(true)} className={`${!isPublic ? "text-zinc-500" : ""}`}>
                    <h1>Public List</h1>
                </a>
                <h1>|</h1>
                <a onClick={() => setIsPublic(false)} className={`${isPublic ? "text-zinc-500" : ""}`}>
                    <h1>Bucket List</h1>
                </a>
            </div>
            <div className="flex justify-center">
                <Carousel className="w-full max-w-xs mt-10">
                    <CarouselContent>
                        {(isPublic ? publicDestinations : privateDestinations).map((destination: Destination) => (
                            <CarouselItem key={destination._id}>
                                <div className="p-1">
                                    <Card>
                                        <CardContent className="flex aspect-square items-center justify-center p-6">
                                            <div className="flip-card" style={{ width: "300px", height: "300px" }}>
                                                <div className="flip-card-inner">
                                                    <div
                                                        className="flip-card-front  flex flex-col items-center justify-center"
                                                        style={{ width: "300px", height: "300px" }}
                                                    >
                                                        <img src={destination.image} alt={destination.title} />
                                                        <h1 className="text-2xl">{destination.title}</h1>
                                                    </div>
                                                    <div
                                                        className="flip-card-back bg-red-500 text-white flex items-center justify-center"
                                                        style={{ width: "300px", height: "300px" }}
                                                    >
                                                        <a
                                                            onClick={() => handleRemove(destination._id)}
                                                            className="cursor-pointer"
                                                        >
                                                            Remove
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
            <Button>
                <Link to="/add">Add a new destination</Link>
            </Button>
            <div className="grid grid-cols-4 gap-20 mt-8">
                {(isPublic ? publicDestinations : privateDestinations).map((destination: Destination) => (
                    <div key={destination._id}>
                        <a
                            className="cursor-pointer"
                            onClick={() => {
                                handleCityClick(destination._id);
                            }}
                        >
                            <h2 className="text-2xl">{destination.title}</h2>
                        </a>
                    </div>
                ))}
            </div>
        </>
    );
}
