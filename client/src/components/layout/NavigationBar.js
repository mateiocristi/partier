import {Link} from 'react-router-dom';
import classes from './style/NavigationBar.module.css'
import {useEffect, useState} from "react";
import {Button} from "@chakra-ui/react";
import LoginDrawer from "./LoginDrawer";
import RegisterDrawer from "./RegisterDrawer";

function NavigationBar() {

    let username = null;
    let role = null;
    let loggedUser = null;

    try {
        loggedUser = JSON.parse(localStorage.getItem("user"));
    } catch {
    }

    const [user, setUser] = useState(loggedUser);

    try {
        username = user.username;
        role = user.roles[0];
    } catch {
    }

    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    return (
        <nav>
            <div className={classes.header + " nav-wrapper"}>
                <Link to='/' className={classes.logo}>Partier</Link>
                <ul id="nav-mobile" className={classes.navButtons + " right hide-on-med-and-down"}>
                    {/*<li><a href="sass.html">Sass</a></li>*/}
                    {/*<li><a href="badges.html">Components</a></li>*/}
                    {/*<li><a href="collapsible.html">JavaScript</a></li>*/}
                    {role == 'ROLE_ORGANISER' &&
                        <li>
                            <Link to='/add-event'>Add Event</Link>
                        </li>
                    }
                    {role == 'ROLE_ADMIN' &&
                        <li>
                            <Link to='/manage-events'>Manage Events</Link>
                        </li>
                    }
                    {username != null &&
                        <li>
                            <Link to='/profile'>Welcome {username}</Link>
                        </li>
                    }
                    {username != null &&
                        <li>
                            <Link to='/myTickets'>myTickets</Link>
                        </li>
                    }
                    {username != null &&
                        <li>
                            <button onClick={() => {
                                localStorage.clear();
                                setUser(null);
                                window.location.href = '/';
                            }}>
                                Log Out

                            </button>
                        </li>
                    }
                    {username == null &&
                        <li>
                            <RegisterDrawer/>
                        </li>}
                    {username == null &&
                        <li>
                            <LoginDrawer/>
                        </li>
                    }
                </ul>
            </div>
        </nav>
        // <div className={classes.header}>
        //     <div className={classes.logo}><Link to='/'><h1>Partier</h1></Link></div>
        //     <nav id="nav">
        //         <ul>
        //             {role == 'ROLE_ORGANISER' &&
        //                 <li>
        //                     <Link to='/add-event'>Add Event</Link>
        //                 </li>
        //             }
        //             {role == 'ROLE_ADMIN' &&
        //                 <li>
        //                     <Link to='/manage-events'>Manage Events</Link>
        //                 </li>
        //             }
        //             {username != null &&
        //                 <li>
        //                     <h2><Link to='/profile'>Welcome {username}</Link></h2>
        //                 </li>
        //             }
        //             {username != null &&
        //                 <li>
        //                     <h2><Link to='/myTickets'>myTickets</Link></h2>
        //                 </li>
        //             }
        //             {username != null &&
        //                 <li>
        //                     <button onClick={() => {
        //                         localStorage.clear();
        //                         setUser(null);
        //                         window.location.href = '/';
        //                     }}><h2>
        //                         Log Out
        //                     </h2>
        //
        //                     </button>
        //                 </li>
        //             }
        //             {username == null &&
        //                 <li>
        //                     <RegisterDrawer/>
        //                 </li>}
        //             {username == null &&
        //                 <li>
        //                     <LoginDrawer/>
        //                 </li>
        //             }
        //
        //         </ul>
        //     </nav>
        // </div>

    )
}

export default NavigationBar;
