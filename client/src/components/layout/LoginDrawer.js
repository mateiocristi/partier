// import {useRef} from "react";
// import React from "react";
//
// import {
//     Drawer,
//     DrawerBody,
//     DrawerFooter,
//     DrawerHeader,
//     DrawerOverlay,
//     DrawerContent,
//     DrawerCloseButton, useDisclosure, Button, Input,
// } from '@chakra-ui/react'
//
//
// function LoginDrawer() {
//
//     const usernameInputRef = useRef();
//     const passwordInputRef = useRef();
//
//     function LoginHandler(user) {
//         const myHeaders = new Headers();
//         myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
//
//         const urlencoded = new URLSearchParams();
//         urlencoded.append("username", user.username);
//         urlencoded.append("password", user.password);
//
//         const requestOptions = {
//             method: 'POST',
//             headers: myHeaders,
//             body: urlencoded,
//             redirect: 'follow'
//         };
//
//
//         fetch("http://localhost:5000/login", requestOptions)
//             .then(response => response.text())
//             .then(result => {
//                 result = JSON.parse(result);
//                 // TODO: add limit of tries
//                 // TODO: add message when invalid password or name
//                 if (result.access_token !== undefined) {
//                     window.localStorage.setItem("token", result.access_token);
//                     const myHeaders = new Headers();
//                     const requestOptions = {
//                         method: 'GET',
//                         headers: myHeaders,
//                         redirect: 'follow'
//                     }
//                     fetch("http://localhost:5000/api/users/name/" + user.username, requestOptions)
//                         .then(response => response.text())
//                         .then(result => {
//                             localStorage.setItem("user", result);
//                             window.location.href = '/';
//                         })
//                         .catch(error => console.log('error', error));
//                 }
//             })
//             .catch(error => {
//                     console.log('error', error)
//                     console.log("Wrong username or password !")
//                 }
//             );
//     }
//
//     function submitHandler(user) {
//         user.preventDefault();
//
//         const enteredUsername = usernameInputRef.current.value;
//         const enteredPassword = passwordInputRef.current.value;
//
//         const userItem = {"username": enteredUsername, "password": enteredPassword}
//
//         LoginHandler(userItem);
//     }
//
//     const {isOpen, onOpen, onClose} = useDisclosure()
//     const btnRef = React.useRef()
//
//     return (
//         <>
//             <Button ref={btnRef} colorScheme='teal' onClick={onOpen}>
//                 Log In
//             </Button>
//             <Drawer
//                 isOpen={isOpen}
//                 placement='right'
//                 onClose={onClose}
//                 finalFocusRef={btnRef}
//             >
//                 <DrawerOverlay />
//                 <DrawerContent>
//                     <DrawerCloseButton/>
//                     <DrawerHeader>Sign In</DrawerHeader>
//
//                     <DrawerBody>
//                         <Input placeholder='Username' ref={usernameInputRef}/>
//                         <Input type="password" placeholder='Password' ref={passwordInputRef}/>
//                     </DrawerBody>
//
//                     <DrawerFooter>
//                         <Button variant='outline' mr={3} onClick={onClose}>
//                             Cancel
//                         </Button>
//                         <Button colorScheme='blue' onClick={submitHandler}>Log In</Button>
//                     </DrawerFooter>
//                 </DrawerContent>
//             </Drawer>
//         </>
//     )
// }
//
// export default LoginDrawer;