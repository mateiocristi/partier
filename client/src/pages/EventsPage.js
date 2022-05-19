import classes from "../components/events/EventsCollection.module.css";
import EventCollection from "../components/events/EventCollection";
import React, {useEffect, useState} from "react";
import AddEvent from "./AddEvent";
import {useAtom} from "jotai";
import {userAtom} from "../globals";
import {Button, Form, Modal} from "react-bootstrap";
import DatePicker from "react-datepicker";

const HEADER_IMG = "https://blogmedia.evbstatic.com/wp-content/uploads/wpmulti/sites/8/shutterstock_199419065.jpg";

function EventsPage(props) {

    const [currentUser] = useAtom(userAtom);
    const [loadedEvents, setLoadedEvents] = useState([]);
    const [currentEvent, setCurrentEvent] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [showAddForm, setShowAddForm] = useState(false);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [image, setImage] = useState("");
    const [category, setCategory] = useState("");

    let currentLocalUser = JSON.parse(localStorage.getItem("user"));

    // console.log("yyy: ", currentLocalUser.id);
    // console.log("end")

    const handleShowAddForm = () => setShowAddForm(true);
    const handleCloseAddForm = () => {
        setShowAddForm(false);
    }

    useEffect(() => {
        setIsLoading(true);
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

        sessionStorage.getItem("token");

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(
            "http://localhost:5000/events/approved", requestOptions
        ).then(response => {
            return response.json();
        }).then(data => {
            if (data.length > 0) {
                const events = [];
                for (const key in data) {
                    const event = {
                        id: key,
                        ...data[key]
                    };
                    events.push(event);
                }

                setIsLoading(false);
                console.log("is loading " + isLoading);
                console.log("loaded events");
                setLoadedEvents(events);
                setCurrentEvent(events[0]);
            }

        });
    }, []);

    if (isLoading) {
        return <>
            <section>
                {/*<AddEvent/>*/}
            </section>
        </>
    }

    async function submitEvenHandler(event) {
        event.preventDefault();
        const eventItem = {
            "title": title,
            "description": description,
            "location": location,
            "startDate": startDate,
            "endDate": endDate,
            "image": image,
            "category": category
        };

        const token = localStorage.getItem("token");

        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "title": eventItem.title,
            "description": eventItem.description,
            "startDate": eventItem.startDate,
            "endDate": eventItem.endDate,
            "category": eventItem.category,
            "location": eventItem.location,
            "image": "https://electronicroads.com/wp-content/uploads/sunwaves-buun.png"
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:5000/events", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

        setShowAddForm(false);

    }

    return (
        <div className={classes.content}>
            <div className={classes.leftContent}>
                <div>
                    {currentEvent !== undefined && <>
                        <h1>{currentEvent.title}</h1>
                        <h2>26 MAY, {currentEvent.location}</h2></>}
                    {/*<h1>{currentEvent.title}</h1>*/}
                    {/*<h2>26 MAY, {currentEvent.location}</h2>*/}
                </div>
                <div className={classes.description}>
                    {currentEvent !== undefined &&
                        <h5>{currentEvent.description}</h5>}
                </div>
                <div className={classes.btnContainer}>
                    <button className="btn btn-dark">Tickets</button>
                    <button className="btn btn-outline-danger">See more</button>
                </div>
            </div>
            <div className={classes.rightContent + " rightContent"}>
                <EventCollection events={loadedEvents} currentEvent={currentEvent} setCurrentEvent={setCurrentEvent}/>
                <div className={classes.invisible + " invisible"}/>
            </div>
            {
                currentLocalUser !== null &&
                <div className={classes.addBtnContainer}>
                    <button className={classes.addBtn + " btn btn-danger"} onClick={handleShowAddForm}><i
                        className="material-icons">add</i></button>
                    <Modal show={showAddForm} onHide={handleCloseAddForm}
                           size="lg"
                           aria-labelledby="contained-modal-title-vcenter"
                           centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Add event</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group className="mb-3" controlId="addEventForm.ControlInput1">
                                    <Form.Label>Event title</Form.Label>
                                    <Form.Control
                                        type="text"
                                        autoFocus
                                        onChange={(e) => {
                                            setTitle(e.target.value)
                                        }}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="addEventForm.ControlInput2">
                                    <Form.Label>Event description</Form.Label>
                                    <Form.Control
                                        type="text"
                                        autoFocus
                                        onChange={e => {
                                            setDescription(e.target.value)
                                        }}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="addEventForm.ControlInput3">
                                    <Form.Label>Location</Form.Label>
                                    <Form.Control
                                        type="text"
                                        autoFocus
                                        onChange={e => {
                                            setLocation(e.target.value)
                                        }}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="addEventForm.ControlInput4">
                                    <Form.Label>Start date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        autoFocus
                                        onChange={e => {
                                            setStartDate(e.target.value)
                                        }}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="addEventForm.ControlInput5">
                                    <Form.Label>End date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        autoFocus
                                        onChange={e => {
                                            setEndDate(e.target.value)
                                        }}
                                    />
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseAddForm}>
                                Close
                            </Button>
                            <Button variant="primary" className="btn-danger" onClick={submitEvenHandler}>
                                Add Event
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            }
        </div>
    );
}

export default EventsPage;