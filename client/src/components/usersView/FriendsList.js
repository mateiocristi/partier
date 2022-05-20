import classes from "./FriendsList.module.css";
import FriendItem from "./FriendItem";

function FriendsList(props) {

    return(
        <div className={classes.container}>
            {props.friends.map(friend => <FriendItem key={friend.id} friend={friend}/>)}
        </div>
    )
}

export default FriendsList;