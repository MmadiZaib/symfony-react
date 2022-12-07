import React, { useState, useEffect } from "react";
import Field from "../components/forms/Field";
import {Link} from "react-router-dom";
import Select from "../components/forms/Select";

import CustomersAPI from "../services/CustomersAPI";

const InvoicePage = (props) => {

    const [invoice, setInvoice] = useState({
        amount: "",
        customer: "",
        status: ""
    });

    const [errors, setErrors] = useState({
        amount: "",
        customer: "",
        status: ""
    });

    const [customers, setCustomers] = useState([]);

    const fetchCustomers = async () => {
        try {
            const data =  await CustomersAPI.findAll();
            setCustomers(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchCustomers();
    }, []);


    const handleChange = ({currentTarget}) => {
        const { name, value } = currentTarget;
        setInvoice({ ...invoice, [name]: value });
    };

    return (
      <>
          <h1>Création d'une facture</h1>
          <form>
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