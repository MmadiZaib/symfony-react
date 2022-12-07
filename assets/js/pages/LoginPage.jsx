import React, { useState, useContext } from "react"

import AuthAPI from "../services/authAPI";
import AuthContext from "../contexts/AuthContext";
import Field from "../components/forms/Field";
import {toast} from "react-toastify";

const LoginPage = ({history }) => {
    const [credentials, setCredentials] = useState({
        "username": "",
        "password": ""
    });

    const { setIsAuthenticated } = useContext(AuthContext)

    const [error, setError] = useState('');

    // input management
    const handleChange = ({currentTarget}) => {
        const {value, name} = currentTarget;
        setCredentials({...credentials, [name]: value});
    }

    // submit management
    const handleSubmit = async event => {
        event.preventDefault();
        try {
           await AuthAPI.authenticate(credentials);
           setError("");
           setIsAuthenticated(true);
           toast.success("Vous êtes désormais connecté !");
           history.replace("/customers");
        } catch (e) {
            setError("Aucun compte ne possède cette adresse ou alors les informations ne correspondent pas!");
            toast.error("Une erreur est survenue");
        }
    }

    return (
      <>
          <h1>Connexion à l'application</h1>
          <form onSubmit={handleSubmit}>
              <Field
                  label="Adresse Email"
                  name="username"
                  value={credentials.username}
                  onChange={handleChange}
                  type="email"
                  placeHolder="Adresse email de connexion"
                  error={error}
              />

              <Field
                  label="Mot de passe"
                  value={credentials.password}
                  onChange={handleChange}
                  name="password"
                  type="password"
              />
              <button type="submit" className="btn btn-success">Je me connecte</button>
          </form>
      </>
    );
};

export default LoginPage;