import classes from "../events/EventList.module.css";
import OrderItem from "./OrderItem";

function OrderList(props) {
    return (
        <ul className={classes.list}>
            {props.orders.map(order => <OrderItem key={order.orderId} order={order} toFavorites={true}/>)}
        </ul>
    );
}

export default OrderList;
