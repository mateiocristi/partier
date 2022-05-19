// function ToFavoriteButton(props) {
//
//     // TODO: check if already it is to favorites
//     function toFavoriteHandler() {
//         let myHeaders = new Headers();
//         myHeaders.append("Content-Type", "application/json");
//
//         let raw = JSON.stringify({
//             "username": JSON.parse(localStorage.getItem("user")).username,
//             "eventId": props.eventId
//         });
//
//         let requestOptions = {
//             method: 'POST',
//             headers: myHeaders,
//             body: raw,
//             redirect: 'follow'
//         };
//
//         fetch("http://localhost:5000/api/event/favorites", requestOptions)
//             .then(response => response.text())
//             .then(result => console.log(result))
//             .catch(error => console.log('error', error));
//     }
//
//     return (
//         <button onClick={toFavoriteHandler}>To Favorite</button>
//     );
// }
//
// export default ToFavoriteButton;