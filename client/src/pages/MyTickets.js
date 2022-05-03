import {useState} from "react";
import classes from "./style/MyTickets.module.css"

function MyTicketsPage() {
    const [tickets, setTickets] = useState([]);

    return (
        <div className={classes.test}>
            <div className="row">
                {/*<div className="s12 yellow">This div is 12-columns wide on all screen sizes</div>*/}
                <div className="col red">6-columns (one-half)</div>
                <div className="col blue">6-columns (one-half)</div>
                <div className="col green">6-columns (one-half)</div>
                <div className="col grey">6-columns (one-half)</div>
                <div className="col orange">6-columns (one-half)</div>
                <div className="col pink">6-columns (one-half)</div>
            </div>
        </div>
    );
}

export default MyTicketsPage;