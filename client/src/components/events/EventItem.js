import classes from './EventItem.module.css';
import {Link, useNavigate} from "react-router-dom";
import ApproveButton from "../event_buttons/ApproveButton";
import BuyTicketButton from "../event_buttons/BuyTicketButton";
import ToFavoriteButton from "../event_buttons/ToFavoriteButton";
import RefuseButton from "../event_buttons/RefuseButton";

function MeetupItem(props) {
    const navigate = useNavigate();
    // console.log(props);
    return (
        <div className={classes.item}>
            <div className={classes.image}  onClick={() => navigate(`/event/${props.event.id}`,{myJSON: props.event})}>
                <img src={props.event.image} alt={props.event.title}/>
            </div>
            <div className={classes.content} onClick={() => navigate(`/event/${props.event.id}`)}>
                <h3>{props.event.title}</h3>
                <address>{props.event.location}</address>
                <p>{truncateWithEllipses(props.event.description, 200).toUpperCase()}</p>
            </div>
            <div className={classes.actions}>
                {props.approve != null &&
                    <ApproveButton eventId={props.event.id}
                                   removeEventFromLoadedEvents={props.removeEventFromLoadedEvents}
                    />
                }
                {props.unapprove != null &&
                    <RefuseButton eventId={props.event.id}
                                  removeEventFromLoadedEvents={props.removeEventFromLoadedEvents}
                    />
                }
                {props.buyTicket != null &&
                    <BuyTicketButton/>
                }
                {props.toFavorites != null &&
                    <ToFavoriteButton/>
                }
            </div>
        </div>
    );
}

export default MeetupItem;

function truncateWithEllipses(text, max) {
    if (text === null) {
        return "";
    }
    return text.substr(0, max - 1) + (text.length > max ? '...' : '');
}