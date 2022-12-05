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

function newCustomer(customer) {
    return axios.post('http://symreact.localhost/api/customers', customer);
}

export default {
    findAll,
    delete: deleteCustomer,
    new: newCustomer
}