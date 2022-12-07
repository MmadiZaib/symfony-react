import axios from "axios";
import Cache from "./cache";

import {CUSTOMERS_API} from "../config";


async function findById(id) {
    const cachedCustomer = await Cache.get("customers." + id);

    if (cachedCustomer) {
        return cachedCustomer
    }

    return axios
        .get(CUSTOMERS_API + "/" + id)
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
        .get(CUSTOMERS_API)
        .then(response => {
            const customers = response.data['hydra:member']
            Cache.set("customers", customers)

            return customers

        })
    ;
}

function deleteCustomer(id) {

    return  axios
        .delete(CUSTOMERS_API +  "/" + id)
        .then(async response => {
            const cacheCustomers = await Cache.get("customers")
            if (cacheCustomers) {
                Cache.set("customers", cacheCustomers.filter(customer => customer.id !== id))
            }

            return response;
        })
}

function newCustomer(customer) {
    return axios.post(CUSTOMERS_API, customer).then(async response =>  {
        const cacheCustomers = await Cache.get("customers")
        if (cacheCustomers) {
            Cache.set("customers",[...cacheCustomers, response.data])
        }
        return response;
    });
}

function update(id, customer) {
    return axios.put(CUSTOMERS_API +  "/" + id, customer).then(async response => {
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