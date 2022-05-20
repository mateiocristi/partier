
class AuthService {
    login(user) {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        const urlencoded = new URLSearchParams();
        urlencoded.append("username", user.username);
        urlencoded.append("password", user.password);


        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };


         return fetch("http://localhost:5000/login", requestOptions)
            .then(response => response.text())
            .then(result => {
                result = JSON.parse(result);
                // TODO: add limit of tries
                // TODO: add message when invalid password or name
                if (result.access_token !== undefined) {
                    localStorage.setItem("token", result.access_token);
                    const myHeaders = new Headers();
                    const requestOptions = {
                        method: 'GET',
                        headers: myHeaders,
                        redirect: 'follow'
                    }
                    fetch("http://localhost:5000/api/users/name/" + user.username, requestOptions)
                        .then(response => response.text())
                        .then(result => {
                            localStorage.setItem("user", result);
                            window.location.href = '/';
                        })
                        .catch(error => console.log('error', error));
                }
            })
            .catch(error => {
                    console.log('error', error)
                    console.log("Wrong username or password !")
                }
            );
    }

    register(user) {
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

        return fetch("http://localhost:5000/api/user/save", requestOptions)
            .then(response => response.text())
            .then(() => {
                window.location.href = '/';
            })
            .catch(error => console.log('error', error));
    }

    logout() {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    }

    getCurrentUser() {
        let user = JSON.parse(localStorage.getItem("user"));
        return user;
    }
}

export default new AuthService();