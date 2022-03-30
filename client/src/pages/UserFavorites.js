import Card from "../components/ui/Card";
import UpdateUserFrom from "../components/layout/UpdateUserForm";
import {useEffect, useState} from "react";
import EventItem from "../components/events/EventItem";

function UserFavorites() {

    const [isLoading, setIsLoading] = useState(true);
    const [loadedEvents, setLoadedEvents] = useState([]);

    function removeEventFromLoadedEvents(id){
        setLoadedEvents(loadedEvents.filter(value => value.id !== id));
    }

    useEffect(() => {
        setIsLoading(true);

        const myHeaders = new Headers();
        // myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

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
            {loadedEvents.map(event => <EventItem event={event}
                                                  unapprove={true}
                                                  removeEventFromLoadedEvents={removeEventFromLoadedEvents}
            />)}
        </section>
    );
}

export default UserFavorites;