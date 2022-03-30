import AddEventForm from "../components/layout/AddEventForm";

function AddEvent() {

    async function AddEventHandler(event) {
        console.log("event: ", event);

        const token = localStorage.getItem("token");

        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer "+token);
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "title": event.title,
            "description": event.description,
            "startDate": event.startDate,
            "endDate": event.endDate,
            "category": event.category,
            "location": event.location,
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

    }

    return (<section>
        <AddEventForm onAddEvent={AddEventHandler}/>
    </section>);
}

export default AddEvent;