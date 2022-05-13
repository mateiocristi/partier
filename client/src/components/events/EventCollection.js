import classes from "./EventsHeader.module.css";
import {useEffect, useState} from "react";

function EventCollection(props) {
    console.log("props ", props);
    const [scrollPosition, setScrollPosition] = useState(0);
    useEffect(() => {
        const inv = document.querySelector(".invisible");
        const scroll = document.querySelector(".rightContent");

        scroll.addEventListener("scroll", event => {
            console.log("scroll ", scroll.scrollTop);
            setScrollPosition(scroll.scrollTop);
        })
        props.setCurrentEvent(props.events[parseInt(scroll.scrollTop / inv.offsetHeight)]);
    }, [scrollPosition]);
    return ( <>
        {props.events.map(event =>
            <div key={event.id} className={classes.card + " container"} style={{backgroundImage: "url(" + event.image + ")"}}/>

        )}
    </>);
}

export default EventCollection;