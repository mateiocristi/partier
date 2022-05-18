import 'material-icons/iconfont/material-icons.css';
import 'bootstrap/dist/css/bootstrap.css';
import VerticalNavbar from "./components/layout/VerticalNavbar";
import HorizontalNavbar from "./components/layout/HorizontalNavbar";
import EventsPage from "./pages/EventsPage";

import {Route, Routes} from "react-router-dom";
import {Provider, atom, useAtom} from "jotai";
import AuthService from "./service/AuthService";
import {userAtom} from "./globals";
import {useEffect} from "react";

function App() {
    const [user, setUser] = useAtom(userAtom);

    console.log("main user is ", user);

    useEffect(() => {
        setUser(AuthService.getCurrentUser());
    }, [])

    return (
        <Provider>
            <div className="App">
                {/*<NavigationBar/>*/}
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
        </Provider>

    );
}

export default App;