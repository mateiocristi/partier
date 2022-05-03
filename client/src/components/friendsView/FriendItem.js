import classes from "./FriendItem.module.css";

function FriendItem(props) {
    return (
        <div className={classes.container}>
            <img src={props.friend.profilePicUrl}/>
            <p>Username</p>
        </div>
    )
}

export default FriendItem;