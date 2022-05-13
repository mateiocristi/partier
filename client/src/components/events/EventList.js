import EventOldItem from "./EventOldItem";
import classes from "./EventList.module.css"

function EventList(props) {
    return (
        <ul className={classes.list}>
            {props.events.map(event => <EventOldItem key={event.id} event={event} toFavorites={true}/>)}
        </ul>
    );
}

export default EventList;
