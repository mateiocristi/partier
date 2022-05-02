

function OrderItem(props) {
    return (
        <div>
            <h1>{props.order.eventName}</h1>
            <p>{props.order.orderId}</p>
        </div>
    )
}

export default OrderItem;