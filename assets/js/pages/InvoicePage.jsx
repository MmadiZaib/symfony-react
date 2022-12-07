import React, { useState, useEffect } from "react";
import Field from "../components/forms/Field";
import {Link} from "react-router-dom";
import Select from "../components/forms/Select";

import CustomersAPI from "../services/CustomersAPI";
import InvoicesAPI from "../services/InvoicesAPI";
import {toast} from "react-toastify";

const InvoicePage = ({match, history}) => {

    const { id = "new"} = match.params;

    const [invoice, setInvoice] = useState({
        amount: "",
        customer: "",
        status: "SENT"
    });

    const [errors, setErrors] = useState({
        amount: "",
        customer: "",
        status: ""
    });

    const [customers, setCustomers] = useState([]);

    const [editing, setEditing] = useState(false);

    const fetchCustomers = async () => {
        try {
            const data =  await CustomersAPI.findAll();
            setCustomers(data);

            if (!invoice.customer && id === "new") {
                setInvoice({...invoice, customer: data[0].id});
            }
        } catch (error) {
            toast.error("Impossible de charger les customers");
            console.log(error);
        }
    }

    const fetchInvoice = async id => {
        try {
            const { amount, customer, status }  = await InvoicesAPI.findById(id);
            const data = { amount, customer: customer.id, status };
            setInvoice(data);
        } catch (error) {
            toast.error("Impossible de charger la facture demandée");
            console.log(error.response);
            history.replace("/invoices");
        }
    }

    useEffect(() => {
        fetchCustomers();
    }, []);


    useEffect(() => {
        if (id !== "new") {
            setEditing(true)
            fetchInvoice(id);
        }
    }, [id]);


    const handleChange = ({currentTarget}) => {
        const { name, value } = currentTarget;
        setInvoice({ ...invoice, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            if (editing) {
                await InvoicesAPI.update(id, invoice);
                toast.success("La facture a bien été modifiée")
            } else {
                await InvoicesAPI.new(invoice);
                toast.success("La facture a bien été créer");
                history.replace("/invoices");
            }
            setErrors({});
        } catch ({response}) {
            const { violations } = response.data;
            if (violations) {
                const apiErrors = {};
                violations.forEach(({propertyPath, message}) => {
                   apiErrors[propertyPath] = message;
                });
                setErrors(apiErrors);
                toast.error("Il y a des erreurs dans votre formulaire survenue");
            }
        }
    }

    return (
      <>
          {!editing &&  <h1>Création d'une facture</h1> || <h1>Modification d'une facture</h1> }
          <form onSubmit={handleSubmit}>
              <Field
                  name="amount"
                  type="number"
                  placeHolder="Montant de la facture"
                  label="Montant"
                  onChange={handleChange}
                  value={invoice.amount}
                  error={errors.amount}
              />
              <Select
                  name="customer"
                  label="Client"
                  value={invoice.customer}
                  error={errors.customer}
                  onChange={handleChange}
              >
                  {customers.map(customer => <option key={customer.id} value={customer.id}>{customer.firstName} {customer.lastName}</option>)}
              </Select>

              <Select
                  name="status"
                  label="Statut"
                  value={invoice.status}
                  error={errors.status}
                  onChange={handleChange}
              >
                  <option value="SENT">Envoyée</option>
                  <option value="PAID">Payée</option>
                  <option value="CANCELLED">Annulée</option>
              </Select>

              <div className="form-group">
                  <button type="submit" className="btn btn-success">Enregistrer</button>
                  <Link to="/invoices" className="btn btn-link">Retour aux factures</Link>
              </div>
          </form>
      </>
    );
};

export default InvoicePage;