import axios from "axios";

function findAll() {
    return axios
        .get("http://symreact.localhost/api/invoices")
        .then(response =>response.data['hydra:member'])
        ;
}

function deleteInvoice(id) {
    return  axios
        .delete("http://symreact.localhost/api/invoices/" + id)
}

export default {
    findAll,
    delete: deleteInvoice
}