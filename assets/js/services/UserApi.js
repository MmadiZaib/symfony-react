import axios from "axios";

function register(user) {
    return axios.post("http://symreact.localhost/api/users", user);
}

export default {
    register
};