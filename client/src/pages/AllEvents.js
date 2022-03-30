import EventList from "../components/events/EventList";
import {useEffect, useState} from "react";
import Countdown from "../components/countdown/Countdown.js";
import {background} from "@chakra-ui/react";

function AllEventsPage() {

    const [isLoading, setIsLoading] = useState(true);
    const [loadedEvents, setLoadedEvents] = useState([]);

    useEffect(() => {
        setIsLoading(true);


        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

        sessionStorage.getItem("token");

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(
            "http://localhost:5000/events/approved", requestOptions
        ).then(response => {
            return response.json();
        }).then(data => {
            const events = [];
            for (const key in data) {
                const event = {
                    id: key,
                    ...data[key]
                };
                events.push(event);
            }

            setIsLoading(false);
            console.log("is loading " + isLoading);
            console.log("loaded events");
            setLoadedEvents(events);
        });
    }, []);

    if (isLoading) {
        return (
            <section>
                <p>Loading...</p>
            </section>
        );
    }

    console.log("background ", loadedEvents);

    return (
        <section>
            {loadedEvents.length > 0 &&
            <Countdown timeTillDate="05 26 2023, 6:00 am" timeFormat="MM DD YYYY, h:mm a" backgroundImage={loadedEvents[0].image} />
            }
            <EventList events={loadedEvents}/>
        </section>
    );
}

export default AllEventsPage;

