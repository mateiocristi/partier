import classes from "./OrderItem.module.css";

function OrderItem(props) {
    return (
        // <div className={classes.ticketCard + " card"}>
        //
        //     <h1>{props.order.eventName}</h1>
        //     <p>{props.order.orderId}</p>
        // </div>
        <div className="row">
            <div className="col s12 m6">
                <div className="card blue-grey darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">{props.order.eventName}</span>
                        <p>{props.order.eventDate}</p>
                    </div>
                    <div className="card-action">
                        <a href="#">View event page</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderItem;