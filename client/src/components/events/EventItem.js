import classes from './EventItem.module.css';
import {Link, useNavigate} from "react-router-dom";
import ApproveEventButton from "../event_buttons/ApproveEventButton";
import BuyTicketButton from "../event_buttons/BuyTicketButton";
import ToFavoriteButton from "../event_buttons/ToFavoriteButton";
import RefuseButton from "../event_buttons/RefuseButton";

function EventItem(props) {
    const navigate = useNavigate();
    return (
        <div className={classes.item}>
            <div className={classes.image}  onClick={() => navigate(`/event/${props.event.id}`,{myJSON: props.event})}>
                <img src={props.event.image} alt={props.event.title}/>
            </div>
            <div className={classes.content} onClick={() => navigate(`/event/${props.event.id}`)}>
                <h3>{props.event.title}</h3>
                <address>{props.event.location}</address>
                <p>{props.event.description}</p>
            </div>
            <div className={classes.actions}>
                {props.approve != null &&
                    <ApproveEventButton eventId={props.event.id}
                                        removeEventFromLoadedEvents={props.removeEventFromLoadedEvents}
                    />
                }
                {props.unapprove != null &&
                    <RefuseButton eventId={props.event.id}
                                  removeEventFromLoadedEvents={props.removeEventFromLoadedEvents}
                    />
                }
                {props.buyTicket != null &&
                    <BuyTicketButton eventId={props.event.id}/>
                }
                {props.toFavorites != null &&
                    <ToFavoriteButton eventId={props.event.id}/>
                }
            </div>
        </div>
    );
}

export default EventItem;