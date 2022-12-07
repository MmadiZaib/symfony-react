import axios from "axios";
import Cache from "./cache";


async function findById(id) {
    const cachedCustomer = await Cache.get("customers." + id);

    if (cachedCustomer) {
        return cachedCustomer
    }

    return axios
        .get("http://symreact.localhost/api/customers/" + id)
        .then(response => {
            const customer = response.data;
            Cache.set("customers." + id);

            return customer;
        });
}

async function findAll() {
    const cachedCustomers = await Cache.get("customers");

    if (cachedCustomers) {
        return cachedCustomers
    }

    return axios
        .get("http://symreact.localhost/api/customers")
        .then(response => {
            const customers = response.data['hydra:member']
            Cache.set("customers", customers)

            return customers

        })
    ;
}

function deleteCustomer(id) {

    return  axios
        .delete("http://symreact.localhost/api/customers/" + id)
        .then(async response => {
            const cacheCustomers = await Cache.get("customers")
            if (cacheCustomers) {
                Cache.set("customers", cacheCustomers.filter(customer => customer.id !== id))
            }

            return response;
        })
}

function newCustomer(customer) {
    return axios.post('http://symreact.localhost/api/customers', customer).then(async response =>  {
        const cacheCustomers = await Cache.get("customers")
        if (cacheCustomers) {
            Cache.set("customers",[...cacheCustomers, response.data])
        }
        return response;
    });
}

function update(id, customer) {
    return axios.put("http://symreact.localhost/api/customers/" + id, customer).then(async response => {
        const cacheCustomers = await Cache.get("customers")
        const cacheCustomer = await Cache.get("customers." + id)

        if (cacheCustomer) {
            Cache.set("customers."+ id, response.data);
        }

        if (cacheCustomers) {
            const index = cacheCustomers.findIndex(customer => customer.id === id);
            cacheCustomers[index] = response.data;
        }

        return response;
    });
}

export default {
    findAll,
    delete: deleteCustomer,
    new: newCustomer,
    update: update,
    findById
}