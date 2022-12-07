import React, {useState, useEffect} from "react";
import Field from "../components/forms/Field";
import {Link} from "react-router-dom";

import CustomersAPI from "../services/CustomersAPI";
import {toast} from "react-toastify";
import FormContentLoader from "../components/loaders/FormContentLoader";

const CustomerPage = ({match, history}) => {

    const { id = "new"} = match.params;

    const [customer, setCustomer] = useState({
        lastName: "",
        firstName: "",
        email: "",
        company: ""
    });

    const [errors, setErrors] = useState({
        lastName: "",
        firstName: "",
        email: "",
        company: ""
    });

    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(false);

    const fetchCustomer = async id => {
        try {
            const { firstName, lastName, company, email } = await CustomersAPI.findById(id);
            setCustomer({firstName, lastName, company, email});
            setLoading(false)
        } catch (error) {
            toast.error("Le client n'a pas pu être chargé");
            history.replace("/customers");
        }
    }

    useEffect( () => {
        if (id !== "new") {
            setEditing(true);
            setLoading(true);
            fetchCustomer(id);
        }
    }, [id]);
    


    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setCustomer({...customer, [name]: value});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
           if (editing) {
               await CustomersAPI.update(id, customer);
               toast.success("Le client a bien été modifié");
           } else {
               await CustomersAPI.new(customer);
               toast.success("Le client a bien été créé");
               history.replace("/customers");
            }

           setErrors({});
        } catch ({response}) {
            const { violations } = response.data;
            if (violations) {
                const apiErrors = {};
                violations.forEach(({ propertyPath, message }) => {
                    apiErrors[propertyPath] = message;
                });

                setErrors(apiErrors);
                toast.error("Des erreurs dans formulaire");
            }
        }
    }

    return (
      <>
         {!editing &&  <h1>Création d'un client</h1> || <h1>Modification du client</h1> }
          {loading && <FormContentLoader />}

          {!loading && <form onSubmit={handleSubmit}>
              <Field
                  name="lastName"
                  label="Nom de famille"
                  placeHolder="Nom de famille du client"
                  value={customer.lastName}
                  onChange={handleChange}
                  error={errors.lastName}
              />
              <Field
                  name="firstName"
                  label="Prénom"
                  placeHolder="Prénom du client"
                  value={customer.firstName}
                  onChange={handleChange}
                  error={errors.firstName}
              />
              <Field
                  name="email"
                  label="Email"
                  placeHolder="Adresse email du client"
                  type="email"
                  value={customer.email}
                  onChange={handleChange}
                  error={errors.email}
              />
              <Field
                  name="company"
                  label="Entreprise"
                  placeHolder="Entreprise du client"
                  value={customer.company}
                  onChange={handleChange}
                  error={errors.company}
              />
              <div className="form-group">
                  <button type="submit" className="btn btn-success">Enregistrer</button>
                  <Link to="/customers" className="btn btn-link">Retour à la liste</Link>
              </div>
          </form>}
      </>
    );
}

export default CustomerPage;