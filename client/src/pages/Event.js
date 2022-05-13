import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import EventOldItem from "../components/events/EventOldItem";

function EventPage() {
    const params = useParams();

    if (localStorage.getItem("token") == null) {
        window.location.replace("/login");
    }

    const [isLoading, setIsLoading] = useState(true);
    const [loadedEvent, setLoadedEvent] = useState("");
    console.log(localStorage.getItem("token"));
    useEffect(async () => {
        setIsLoading(true);
        fetch(
            `http://localhost:5000/events/${params.eventId}`
        ).then(response => {
            return response.json();
        }).then(data => {
            setIsLoading(false);
            setLoadedEvent(data);
        });
    }, []);

    if (isLoading) {
        return (
            <section>
                <p>Loading...</p>
            </section>
        );
    }

    return (
        <EventOldItem event={loadedEvent}
                      buyTicket={true}/>
    );

}

export default EventPage;