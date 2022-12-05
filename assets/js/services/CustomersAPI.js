import axios from "axios";


function findCustomer(id) {
    return axios
        .get("http://symreact.localhost/api/customers/" + id)
        .then(response => response.data);
}

function findAll() {
    return axios
        .get("http://symreact.localhost/api/customers")
        .then(response => response.data['hydra:member'])
    ;
}

function deleteCustomer(id) {
    return  axios
        .delete("http://symreact.localhost/api/customers/" + id)
}

function newCustomer(customer) {
    return axios.post('http://symreact.localhost/api/customers', customer);
}

function updateCustomer(id, customer) {
    return axios.put("http://symreact.localhost/api/customers/" + id, customer);
}

export default {
    findAll,
    delete: deleteCustomer,
    new: newCustomer,
    update: updateCustomer,
    findById: findCustomer
}