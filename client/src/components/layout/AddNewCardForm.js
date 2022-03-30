import "react-datepicker/dist/react-datepicker.css";
import classes from "./style/UpdateUser.module.css";
import {useState} from "react";

function AddNewCardForm(props) {

    const [cardNumber, setCardNumber] = useState("");
    const [expYear, setExpYear] = useState("");
    const [expMonth, setExpMonth] = useState("");
    const [CVV, setCVV] = useState("");

    // TODO: add check for input (card number 12 digits, valid month year etc)
    // (function () {
    //     if (password !== "" && repeatPassword !== "") {
    //         const updateButton = document.querySelector("#updateButton");
    //         console.log(updateButton);
    //         if (password !== repeatPassword) {
    //             console.log("no match");
    //             // updateButton.classList.add("disabled");
    //         } else {
    //             // updateButton.classList.remove("disabled");
    //             console.log("match");
    //         }
    //     }
    // })();

    function addCardHandler(card) {
        card.preventDefault();
        const cardDetails = {
            "cardNumber": cardNumber,
            "expYear": expYear,
            "expMonth": expMonth,
            "cvv": CVV
        };
        props.onAddCardHandler(cardDetails);
    }

    return (
        <div className={`${classes.container}`}>
            <form>
                <div className={`${classes.group}`}>
                    <input type="text" className={`${classes.input}`} onChange={event => setCardNumber(event.target.value)}/>
                    <span className={`${classes.highlight}`}/>
                    <span className={`${classes.bar}`}/>
                    <label className={`${classes.label}`}>Card Number:</label>
                </div>
                <div className={`${classes.group}`}>
                    <input type="number" className={`${classes.input}`} onChange={event => setExpMonth(event.target.value)}/>
                    <span className={`${classes.highlight}`}/>
                    <span className={`${classes.bar}`}/>
                    <label className={`${classes.label}`}>Exp Month:</label>
                </div>
                <div className={`${classes.group}`}>
                    <input type="number" className={`${classes.input}`} onChange={event => setExpYear(event.target.value)}/>
                    <span className={`${classes.highlight}`}/>
                    <span className={`${classes.bar}`}/>
                    <label className={`${classes.label}`}>Exp Year:</label>
                </div>
                <div className={`${classes.group}`}>
                    <input type="number" className={`${classes.input}`} onChange={event => setCVV(event.target.value)}/>
                    <span className={`${classes.highlight}`}/>
                    <span className={`${classes.bar}`}/>
                    <label className={`${classes.label}`}>CVC:</label>
                </div>
            </form>
            <button id="updateButton" className={`${classes.button36}`} onClick={addCardHandler} role="button">Add Card</button>
        </div>
    )
}

export default AddNewCardForm;
