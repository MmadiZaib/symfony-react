import axios from "axios";
import jwtDecode from "jwt-decode";

function authenticate(credentials) {
     return axios
            .post("http://symreact.localhost/api/login_check", credentials)
            .then(response => response.data.token)
            .then(token => {
                window.localStorage.setItem("authToken", token);
                setAxiosToken(token);
            });
}

function istAuthenticated() {
    const token = window.localStorage.getItem("authToken");
    if (token) {
        const {exp: expiration} = jwtDecode(token)
        return expiration * 1000 > new Date().getTime;
    }

    return false;
}

function setAxiosToken(token) {
    axios.defaults.headers["Authorization"] = "Bearer " + token;
}

function logout() {
    window.localStorage.removeItem("authToken");
    delete axios.defaults.headers["Authorization"];
}

function setup() {
    const token = window.localStorage.getItem("authToken");
    if (token) {
        const {exp: expiration} = jwtDecode(token)
        if (expiration * 1000 > new Date().getTime) {
            setAxiosToken(token);
        }
    }
}
export default {
    authenticate,
    logout,
    setup,
    istAuthenticated
};