import classes from "./VerticalNavbar.module.css"

function VerticalNavbar() {
    return (
        <div className={classes.container}>
            <div className={classes.logo}><h1>partier</h1></div>
            <div className={classes.buttonDiv}>
                <h3>Events</h3>
                <div className={classes.shadow}/>
            </div>
            <div className={classes.buttonDiv}>
                <h3>Artists</h3>
                <div className={classes.shadow}/>
            </div>
            <div className={classes.buttonDiv}>
                <h3>About us</h3>
                <div className={classes.shadow}/>
            </div>
            <div className={classes.buttonDiv}>
                <h3>Contact</h3>
                <div className={classes.shadow}/>
            </div>
        </div>)
}

export default VerticalNavbar;