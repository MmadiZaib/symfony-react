import axios from "axios";


function findById(id) {
    return axios
        .get("http://symreact.localhost/api/invoices/" + id)
        .then(response => response.data);
}

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

function newInvoice(invoice) {
    return axios.post('http://symreact.localhost/api/invoices', {...invoice, customer: `/api/customers/${invoice.customer}` });
}

function updateInvoice(id, invoice) {
    return axios.put("http://symreact.localhost/api/invoices/" + id, {...invoice, customer: `/api/customers/${invoice.customer}`});
}

export default {
    findById,
    findAll,
    delete: deleteInvoice,
    new: newInvoice,
    update: updateInvoice
}