import React, {useState} from "react";
import Field from "../components/forms/Field";
import {Link} from "react-router-dom";

import CustomersAPI from "../services/CustomersAPI";

const CustomerPage = (props) => {

    const [customer, setCustomer] = useState({
        lastName: "",
        firstName: "",
        email: "",
        company: ""
    });

    const [error, setError] = useState({
        lastName: "",
        firstName: "",
        email: "",
        company: ""
    });

    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setCustomer({...customer, [name]: value});
    }

    const handleSubmit = async () => {
        event.preventDefault();

        try {
           const response =  await CustomersAPI.new(customer);
           console.log(response);
        } catch (error) {
            console.log(error.response);
        }
    }

    return (
      <>
          <h1>Creation d'un client</h1>

          <form onSubmit={handleSubmit}>
              <Field
                  name="lastName"
                  label="Nom de famille"
                  placeHolder="Nom de famille du client"
                  value={customer.lastName}
                  onChange={handleChange}
                  error={error.lastName}
              />
              <Field
                  name="firstName"
                  label="Prénom"
                  placeHolder="Prénom du client"
                  value={customer.firstName}
                  onChange={handleChange}
                  error={error.firstName}
              />
              <Field
                  name="email"
                  label="Email"
                  placeHolder="Adresse email du client"
                  type="email"
                  value={customer.email}
                  onChange={handleChange}
                  error={error.email}
              />
              <Field
                  name="company"
                  label="Entreprise"
                  placeHolder="Entreprise du client"
                  value={customer.company}
                  onChange={handleChange}
                  error={error.company}
              />
              <div className="form-group">
                  <button type="submit" className="btn btn-success">Enregistrer</button>
                  <Link to="/customers" className="btn btn-link">Retour à la liste</Link>
              </div>
          </form>
      </>
    );
}

export default CustomerPage;