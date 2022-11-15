import axios from "axios";

function findAll() {
    return axios
        .get("http://symreact.localhost/api/customers")
        .then(response =>response.data['hydra:member'])
    ;
}

function deleteCustomer(id) {
    return  axios
        .delete("http://symreact.localhost/api/customers/" + id)
}

export default {
    findAll,
    delete: deleteCustomer
}