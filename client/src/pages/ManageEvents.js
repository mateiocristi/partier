import {useEffect, useState} from "react";
import EventOldItem from "../components/events/EventOldItem";

function ManageEvents() {

    const [isLoading, setIsLoading] = useState(true);
    const [loadedEvents, setLoadedEvents] = useState([]);

    function removeEventFromLoadedEvents(id){
        setLoadedEvents(loadedEvents.filter(value => value.id !== id));
    }

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
            "http://localhost:5000/events/unapproved", requestOptions
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

    return (
        <section>
            {loadedEvents.map(event => <EventOldItem event={event}
                                                     approve={true}
                                                     unapprove={true}
                                                     removeEventFromLoadedEvents={removeEventFromLoadedEvents}
            />)}
        </section>
    );
}

export default ManageEvents;

