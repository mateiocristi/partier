import "react-datepicker/dist/react-datepicker.css";
import classes from "./style/UpdateUser.module.css";
import {useState} from "react";

function UpdateUserForm(props) {

    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    let user;

    if (localStorage.getItem("user") != null) {
        user = JSON.parse(localStorage.getItem("user"));
    } else {
        return;
    }

    // TODO: add check for email(format, not in DB) length etc...
    (function () {
        if (password !== "" && repeatPassword !== "") {
            const updateButton = document.querySelector("#updateButton");
            console.log(updateButton);
            if (password !== repeatPassword) {
                console.log("no match");
                // updateButton.classList.add("disabled");
            } else {
                // updateButton.classList.remove("disabled");
                console.log("match");
            }
        }
    })();

    function updateHandler(user) {
        user.preventDefault();
        const userItem = {
            "email": email,
            "firstName": firstName,
            "lastName": lastName,
            "address": address,
            "password": password,
            "repeatedPassword": repeatPassword
        };
        props.onUpdateUser(userItem);
    }

    // TODO: make separate form for password change
    return (
        <div className={`${classes.container}`}>
            <form>
                <div className={`${classes.group}`}>
                    <input type="text" className={`${classes.input}`} onChange={event => setEmail(event.target.value)}/>
                    <span className={`${classes.highlight}`}/>
                    <span className={`${classes.bar}`}/>
                    <label className={`${classes.label}`}>Email: {user.email}</label>
                </div>
                <div className={`${classes.group}`}>
                    <input type="text" className={`${classes.input}`} onChange={event => setFirstName(event.target.value)}/>
                    <span className={`${classes.highlight}`}/>
                    <span className={`${classes.bar}`}/>
                    <label className={`${classes.label}`}>First Name: {user.firstName}</label>
                </div>
                <div className={`${classes.group}`}>
                    <input type="text" className={`${classes.input}`} onChange={event => setLastName(event.target.value)}/>
                    <span className={`${classes.highlight}`}/>
                    <span className={`${classes.bar}`}/>
                    <label className={`${classes.label}`}>Last Name: {user.lastName}</label>
                </div>
                <div className={`${classes.group}`}>
                    <input type="text" className={`${classes.input}`} onChange={event => setAddress(event.target.value)}/>
                    <span className={`${classes.highlight}`}/>
                    <span className={`${classes.bar}`}/>
                    <label className={`${classes.label}`}>Address: {user.address}</label>
                </div>
                <div className={`${classes.group}`}>
                    <input type="password" className={`${classes.input}`} onChange={event => setPassword(event.target.value)}/>
                    <span className={`${classes.highlight}`}/>
                    <span className={`${classes.bar}`}/>
                    <label className={`${classes.label}`}>Password</label>
                </div>
                <div className={`${classes.group}`}>
                    <input type="password" className={`${classes.input}`} onChange={event => setRepeatPassword(event.target.value)}/>
                    <span className={`${classes.highlight}`}/>
                    <span className={`${classes.bar}`}/>
                    <label className={`${classes.label}`}>Repeat Password</label>
                </div>
            </form>
            <button id="updateButton" className={`${classes.button36}`} onClick={updateHandler} role="button">Update</button>
        </div>
    )
}

export default UpdateUserForm;