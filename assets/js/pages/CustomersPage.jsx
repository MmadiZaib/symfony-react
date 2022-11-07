import React, { useEffect, useState } from "react";
import axios from "axios"

const CustomersPage = (props) => {

    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        axios
            .get("http://symreact.localhost/api/customers")
            .then(response =>response.data['hydra:member'])
            .then(data => setCustomers(data))
            .catch(error => console.log(error.response));
    }, [])

    const handleDelete = id => {
        const originalCustomers = [...customers];
        setCustomers(customers.filter(customer => customer.id !== id));

        axios.delete("http://symreact.localhost/api/customers/" + id)
            .then(response => console.log('OK'))
            .catch(error => {
                setCustomers(originalCustomers);
                console.log(error.response);
            });
    };

    return (
        <>
            <h1>Liste des clients</h1>

            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Id.</th>
                        <th>Client</th>
                        <th>Email</th>
                        <th>Entreprise</th>
                        <th className="text-center">Factures</th>
                        <th className="text-center">Montant total</th>
                        <th/>
                    </tr>
                </thead>
                <tbody>
                {customers.map(customer => <tr key={customer.id}>
                    <td>{customer.id}</td>
                    <td>
                        <a href="#">{customer.firstName} {customer.lastName}</a>
                    </td>
                    <td>{customer.email}</td>
                    <td>{customer.company}</td>
                    <td className="text-center">
                        <span className="badge bg-primary">{customer.invoices.length}</span>
                    </td>
                    <td className="text-center">{customer.totalAmount.toLocaleString()} €</td>
                    <td>
                        <button
                            onClick={() => handleDelete(customer.id)}
                            disabled={customer.invoices.length > 0}
                            className="btn btn-sm btn-danger">
                            Supprimer
                        </button>
                    </td>
                </tr>)}
                </tbody>
            </table>
        </>

    );
}

export default CustomersPage;