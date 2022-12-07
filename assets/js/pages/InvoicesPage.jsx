import React, {useEffect, useState} from "react";
import moment from "moment";
import Pagination from "../components/Pagination";
import InvoicesAPI from "../services/InvoicesAPI";
import CustomersAPI from "../services/CustomersAPI";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";
import TableLoader from "../components/loaders/TableLoader";


const STATUS_CLASSES = {
    PAID: "success",
    SENT: "primary",
    CANCELLED: "danger"
};

const STATUS_LABEL = {
    PAID: "Payée",
    SENT: "Envoyée",
    CANCELLED: "Annulée"
};


const InvoicesPage = ({history}) => {

    const [invoices, setInvoices] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchInvoices = async () => {
        try {
            const data = await InvoicesAPI.findAll();
            setInvoices(data);
            setLoading(false);
        } catch (error) {
            console.log(error.response)
            toast.error("Erreur lors du chargment des factures");
        }
    };

    useEffect(() => {
        fetchInvoices();
    }, []);

    const formatDate = (str) => {
        return moment(str).format('DD/MM/YYYY');
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

    const handleDelete = async id => {
        const originalInvoices = [...invoices];
        setInvoices(invoices.filter(invoice => invoice.id !== id));

        try {
            await InvoicesAPI.delete(id)
            toast.success("La facture a bien été supprimée");
        } catch (error) {
            setInvoices(originalInvoices);
            console.log(error.response);
            toast.error("Une erreur est survenue");
        }
    };

    const itemsPerPage = 10;

    const filteredInvoices = invoices.filter(i =>
        i.customer.lastName.toLowerCase().includes(search.toLowerCase()) ||
        i.customer.firstName.toLowerCase().includes(search.toLowerCase()) ||
        i.amount.toString().startsWith(search.toLowerCase()) ||
        STATUS_LABEL[i.status].toLowerCase().includes(search.toLowerCase())
    );

    // Data pagination
    const paginatedInvoices = Pagination.getData(
        filteredInvoices,
        currentPage,
        itemsPerPage
    );


    return (
        <>
            <div className="mb-3 d-flex justify-content-between align-items-center">
                <h1>Liste des factures</h1>
                <Link to="/invoices/new" className="btn btn-primary">Créer une facture</Link>
            </div>


            <div className="form-group">
                <input className="form-control" onChange={handleSearch} value={search} placeholder="Rechercher ..."/>
            </div>

            <table className="table table-hover">
                <thead>
                <tr>
                    <th>Numéro</th>
                    <th>Client</th>
                    <th className="text-center">Date d'envoi</th>
                    <th className="text-center">Statut</th>
                    <th className="text-center">Montant</th>
                    <th></th>
                </tr>
                </thead>
                {!loading && <tbody>
                {paginatedInvoices.map(invoice =>
                    <tr key={invoice.id}>
                        <td>{invoice.invoiceId}</td>
                        <td>
                            <Link to={"/customers/" + invoice.customer.id}>{invoice.customer.firstName} {invoice.customer.lastName}</Link>
                        </td>
                        <td className="text-center">{formatDate(invoice.sentAt)}</td>
                        <td className="text-center">
                        <span className={"badge bg-" + STATUS_CLASSES[invoice.status]}>
                            {STATUS_LABEL[invoice.status]}
                        </span>
                        </td>
                        <td className="text-center">{invoice.amount.toLocaleString()} €</td>
                        <td>
                            <Link to={"/invoices/" + invoice.id } className="btn btn-sm btn-primary">Edit</Link>
                            <button
                                onClick={() => handleDelete(invoice.id)}
                                className="btn btn-sm btn-danger">
                                Supprimer
                            </button>
                        </td>
                    </tr>
                )}
                </tbody>
                }
            </table>
            {loading && <TableLoader />}
            <Pagination
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                onPageChanged={handlePageChange}
                length={invoices.length}
            />
        </>
    );
};

export default InvoicesPage;