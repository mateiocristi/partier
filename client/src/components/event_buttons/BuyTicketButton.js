import {useEffect, useState} from "react";
import select from "react-select/base";
// import {useToast} from "@chakra-ui/react";

function BuyTicketButton(props) {

    console.log("this is buy ticket button");

    // const [selectedCardId, setSelectedCardId] = useState("");
    const [userCards, setUserCards] = useState([])
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("http://localhost:5000/api/cards/" + user.username, requestOptions)
            .then(response => {
                return response.json();
            })
            .then((response) => {
                console.log("response " + JSON.stringify(response));

                const op = []
                for (const key in response) {
                    const card = {
                        ...response[key]
                    };
                    const option = {
                        value: card.sptripePaymentMethodId,
                        label: card.brand,
                        expYear: card.expYear
                    }
                    op.push(option);

                }

                setUserCards(op);
                // console.log("options ", options);

            })
            .catch(error => console.log('error', error));

    }, []);

    function buyHandler() {
        const user = JSON.parse(localStorage.getItem("user"));

        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        console.log("user id is " + user.id);
        fetch("http://localhost:5000/events/buy/" + user.id + "/" + props.eventId + "/" + user.stripeCustomerId + "/" + props.cardId, requestOptions)
            .then(response => response.text())
            .then(result => {
                if (result !== "failed") {

                }

                else {

                }

                console.log("myresult " + result)
            })
            .catch(error => console.log('error', error));
    }

    console.log("length ", userCards.length);

    return (
        <>
            {userCards.length === 0 &&
                <select onChange={(event => {
                    props.setCardId(event.target.value);
                    console.log("card id ", props.cardId);
                })}>
                    {/*{(() => {*/}
                    {/*    const optionsJSX = [];*/}

                    {/*    for (let option of userCards) {*/}
                    {/*        optionsJSX.push(<option key={option.label}*/}
                    {/*                                value={option.value}>{option.label} {option.expYear}</option>);*/}
                    {/*    }*/}
                    {/*    console.log("my cards ", userCards);*/}
                    {/*    // optionsJSX.push(<option key={userCards[0].label}*/}
                    {/*    //                         value="xx">{userCards[0].label}</option>);*/}
                    {/*    // optionsJSX.push(<option key="yy"*/}
                    {/*    //                         value="yy">yyyy</option>);*/}
                    {/*    return optionsJSX;*/}
                    {/*})()}*/}
                </select>
            }
            <button onClick={buyHandler}>Buy Ticket</button>
        </>
    );

}

export default BuyTicketButton;
