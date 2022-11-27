import axios from "axios";

function authenticate(credentials) {
     return axios
            .post("http://symreact.localhost/api/login_check", credentials)
            .then(response => response.data.token)
            .then(token => {
                window.localStorage.setItem("authToken", token);
                axios.defaults.headers["Authorization"] = "Bearer " + token;

                return true;
            });
}

export default {
    authenticate
};