import {useEffect, useState} from "react";
import React from "react";

import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton, useDisclosure, Button, Input, Select, Tooltip, Stack, Alert
} from '@chakra-ui/react'

function RegisterDrawer() {

    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("ROLE_USER");

    const [wrongUsername, setWrongUsername] = useState(true);
    const [wrongEmail, setWrongEmail] = useState(true);
    const [wrongPassword, setWrongPassword] = useState(true);

    (function () {
        if (document.querySelector("#submit") === null)
            return;
        if (wrongPassword || wrongUsername || wrongEmail || password !== repeatPassword) {
            document.querySelector("#submit").style.pointerEvents = "none";
            document.querySelector("#submit").style.backgroundColor = "#a6a5a5";
            document.querySelector("#submit").style.cursor = "default";
        } else {
            document.querySelector("#submit").style.backgroundColor = "#1f9c1f";
            document.querySelector("#submit").style.pointerEvents = "";
            document.querySelector("#submit").style.cursor = "";
        }
    })();

    useEffect(() => {
        let res = username.length > 15 || username.length < 6 || !/^[a-zA-Z0-9]+$/.exec(username);
        setWrongUsername(res);
        if (username !== "") {
            document.querySelector("#alertUsername").style.display = (res) ? "inline" : "none";
            document.querySelector("#alertUsername").innerHTML = "Invalid username";
        }
    }, [username]);

    useEffect(() => {
        let res = !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.exec(email);
        setWrongEmail(res);
        if (email !== "") {
            document.querySelector("#alertEmail").style.display = (res) ? "inline" : "none";
            document.querySelector("#alertEmail").innerHTML = "Invalid email";
        }
    }, [email]);

    useEffect(() => {
        let res = !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.exec(password);
        setWrongPassword(res);
        if (password !== "") {
            document.querySelector("#alertPassword").style.display = (res) ? "inline" : "none";
        }
    }, [password]);

    useEffect(() => {
        if (password !== "" && repeatPassword !== "")
            document.querySelector("#alertRepeatPassword").style.display = (password !== repeatPassword) ? "inline" : "none";
    }, [repeatPassword]);

    function registerHandler(user) {

        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify({
            "email": user.email,
            "username": user.username,
            "password": user.password,
            "roles": [user.role]
        });

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:5000/api/user/save", requestOptions)
            .then(response => response.text())
            .then(() => {
                window.location.href = '/';
            })
            .catch(error => console.log('error', error));
    }

    async function submitHandler(user) {

        let requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        let response = await fetch("http://localhost:5000/api/check/username/" + username, requestOptions);
        let userExist = (response.status === 200);
        response = await fetch("http://localhost:5000/api/check/email/" + email, requestOptions);
        let emailExist = (response.status === 200);

        if (!userExist && !emailExist) {
            user.preventDefault();
            const userItem = {
                "username": username,
                "email": email,
                "role": role,
                "password": password,
                "repeatedPassword": repeatPassword
            };
            registerHandler(userItem);
        } else {
            if (userExist) {
                setWrongUsername(true);
                document.querySelector("#alertUsername").style.display = "inline";
                document.querySelector("#alertUsername").innerHTML = "Username is already taken";
            }
            if (emailExist) {
                setWrongEmail(true);
                document.querySelector("#alertEmail").style.display = "inline";
                document.querySelector("#alertEmail").innerHTML = "Email is already used";
            }
        }
    }

    const {isOpen, onOpen, onClose} = useDisclosure()
    const btnRef = React.useRef()

    return (
        <>
            <Button ref={btnRef} colorScheme='teal' onClick={onOpen}>
                Register
            </Button>
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay/>
                <DrawerContent>
                    <DrawerCloseButton/>
                    <DrawerHeader>Create your account</DrawerHeader>

                    <DrawerBody>
                        <Stack spacing={3}>
                            <Alert id="alertUsername" status='error' display={"none"}>
                                Invalid username
                            </Alert>
                            <Tooltip
                                label='Usernames can contain letters, numbers. A username must be between 6-15 characters.'
                                fontSize='md'>
                                <Input placeholder='Username' onChange={event => setUsername(event.target.value)}/>
                            </Tooltip>
                            <Alert id="alertEmail" status='error' display={"none"}>
                                Invalid email
                            </Alert>
                            <Tooltip
                                label='Please enter a valid email address.'
                                fontSize='md'>
                                <Input placeholder='Email' onChange={event => setEmail(event.target.value)}/>
                            </Tooltip>
                            <Alert id="alertPassword" status='error' display={"none"}>
                                Invalid password
                            </Alert>
                            <Tooltip
                                label='Password must contain: uppercase, digit, special character and must be at least 8 character long'
                                fontSize='md'>
                                <Input type="password" placeholder='Password'
                                       onChange={event => setPassword(event.target.value)}/>
                            </Tooltip>
                            <Alert id="alertRepeatPassword" status='error' display={"none"}>
                                Passwords do not match
                            </Alert>
                            <Input type="password" placeholder='Repeat Password'
                                   onChange={event => setRepeatPassword(event.target.value)}/>
                            <Tooltip
                                label='As a user you can buy tickets to different events, as organiser you can add different events'
                                fontSize='md'>
                                <Select defaultValue='ROLE_USER' name="role" id="role"
                                        onChange={event => setRole(event.target.value)}>
                                    <option value="ROLE_USER">User</option>
                                    <option value="ROLE_ORGANISER">Organiser</option>
                                </Select>
                            </Tooltip>
                        </Stack>
                    </DrawerBody>
                    <DrawerFooter>
                        <Button variant='outline' mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button id="submit" colorScheme='blue' onClick={submitHandler}>Register</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default RegisterDrawer;