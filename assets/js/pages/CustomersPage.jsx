import React, { useEffect, useState } from "react";
import Pagination from "../components/Pagination";

import CustomersAPI from "../services/CustomersAPI";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";
import TableLoader from "../components/loaders/TableLoader";

const CustomersPage = (props) => {

    const [customers, setCustomers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchCustomers = async () => {
        try {
            const data = await CustomersAPI.findAll();
            setCustomers(data);
            setLoading(false);
        } catch (error) {
            console.log(error.response)
            toast.error("Impossible de charger les clients");
        }
    };

    // Au load the component, we are going to search all customers
    useEffect(() => {
        fetchCustomers();
    }, []);


    /* Functions */

    const handleDelete = async id => {
        const originalCustomers = [...customers];
        setCustomers(customers.filter(customer => customer.id !== id));

        try {
            await CustomersAPI.delete(id)
            toast.success("Le client a bien été supprimé");
        } catch (error) {
            setCustomers(originalCustomers);
            console.log(error.response);
            toast.error("Une erreur est survenue lors de la suppression du client")
        }
    };

    // Manage page change
    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    // Manage search engine
    const handleSearch = event => {
        setSearch(event.currentTarget.value);
        setCurrentPage(1);
    };

    /* END Functions */

    const itemsPerPage = 10;

    const filteredCustomers = customers.filter(c =>
        c.firstName.toLowerCase().includes(search.toLowerCase()) ||
        c.lastName.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase()) ||
        c.company.toLowerCase().includes(search.toLowerCase())
    );

    // Data pagination
    const paginatedCustomers = Pagination.getData(
        filteredCustomers,
        currentPage,
        itemsPerPage
    );

    return (
        <>
            <div className="mb-3 d-flex justify-content-between align-items-center">
                <h1>Liste des clients</h1>
                <Link to="/customers/new" className="btn btn-primary">Créer un client</Link>
            </div>

            <div className="form-group">
                <input className="form-control" onChange={handleSearch} value={search} placeholder="Rechercher ..."/>
            </div>

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
                {!loading && <tbody>
                {paginatedCustomers.map(customer => <tr key={customer.id}>
                    <td>{customer.id}</td>
                    <td>
                        <Link to={"/customers/" + customer.id}>{customer.firstName} {customer.lastName}</Link>
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
                }
            </table>
            {loading && <TableLoader/>}
            {itemsPerPage < filteredCustomers.length &&
            <Pagination currentPage={currentPage}
                        itemsPerPage={itemsPerPage}
                        length={filteredCustomers.length}
                        onPageChanged={handlePageChange}
            />}

        </>

    );
}

export default CustomersPage;