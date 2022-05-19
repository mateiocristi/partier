import 'material-icons/iconfont/material-icons.css';
import 'bootstrap/dist/css/bootstrap.css';
import VerticalNavbar from "./components/layout/VerticalNavbar";
import HorizontalNavbar from "./components/layout/HorizontalNavbar";
import EventsPage from "./pages/EventsPage";

import {Route, Routes} from "react-router-dom";
import AuthService from "./service/AuthService";
import {useEffect} from "react";

function App() {

    useEffect(() => {
        // setCurrentUser(AuthService.getCurrentUser());
    }, [])


    return (
        <div className="App">
            <section className="navSection">
                <VerticalNavbar/>
                {/*<div className="navDivider"/>*/}
            </section>
            <section className="right-section">
                <HorizontalNavbar/>
                <div className="contentSection">
                    <Routes>
                        <Route path="/" element={<EventsPage/>} exact/>
                    </Routes>
                </div>
            </section>

            {/*<FooterPage/>*/}
        </div>

    );
}

export default App;