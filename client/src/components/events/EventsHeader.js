import classes from "./EventsHeader.module.css";
import EventCollection from "./EventCollection";
import {useEffect, useState} from "react";

const HEADER_IMG = "https://blogmedia.evbstatic.com/wp-content/uploads/wpmulti/sites/8/shutterstock_199419065.jpg";

function EventsHeader() {
    const [loadedEvents, setLoadedEvents] = useState([]);
    const [currentEvent, setCurrentEvent] = useState({});
    const [isLoading, setIsLoading] = useState(true);

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
            setCurrentEvent(events[0]);
        });
    }, []);

    if (isLoading) {
        return <>
            <p>Loading</p>
        </>
    }


    return (
        <div className={classes.content}>
            <div className={classes.leftContent}>
                <div>
                    {currentEvent !== undefined && <>
                        <h1>{currentEvent.title}</h1>
                        <h2>26 MAY, {currentEvent.location}</h2></>}
                    {/*<h1>{currentEvent.title}</h1>*/}
                    {/*<h2>26 MAY, {currentEvent.location}</h2>*/}
                </div>
                <div className={classes.description}>
                    {currentEvent !== undefined &&
                    <h5>{currentEvent.description}</h5>}
                </div>
                <div className={classes.btnContainer}>
                    <button className="btn btn-dark">Tickets</button>
                    <button className="btn btn-outline-danger">See more</button>
                </div>
            </div>
            <div className={classes.rightContent + " rightContent"}>
                <EventCollection events={loadedEvents} currentEvent={currentEvent} setCurrentEvent={setCurrentEvent}/>
                <div className={classes.invisible + " invisible"}/>
            </div>
        </div>
    );
}

export default EventsHeader;