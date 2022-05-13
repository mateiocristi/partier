import classes from './EventItem.module.css';
import {Link, useNavigate} from "react-router-dom";
import ApproveEventButton from "../event_buttons/ApproveEventButton";
import BuyTicketButton from "../event_buttons/BuyTicketButton";
import ToFavoriteButton from "../event_buttons/ToFavoriteButton";
import RefuseButton from "../event_buttons/RefuseButton";
import M from "materialize-css";
import {useEffect, useState} from "react";
import PaymentMethod from "../event_buttons/PaymentMethod";
import PaymentMethodsSelect from "../event_buttons/PaymentMethod";

function EventOldItem(props) {
    const [selectedCardId, setSelectedCardId] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        const elems = document.querySelectorAll('.parallax');
        const instances = M.Parallax.init(elems);
        initSelect();
    }, [])

    function initSelect() {
        const elems = document.querySelectorAll('select');
        const instances = M.FormSelect.init(elems);
    }

    return (
        <div className={classes.item}>
            <div onClick={() => navigate(`/event/${props.event.id}`,{myJSON: props.event})}>
                <div><img src={props.event.image} alt={props.event.title}/></div>
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



                {/*{props.buyTicket != null &&*/}
                {/*    <BuyTicketButton eventId={props.event.id} cardId={selectedCardId}/>*/}
                {/*}*/}

                    {/*<ToFavoriteButton eventId={props.event.id}/>*/}
                {/*<PaymentMethodsSelect setCardId={setSelectedCardId}/>*/}

            </div>
        </div>
    );
}

export default EventOldItem;