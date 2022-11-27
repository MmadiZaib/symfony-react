import React, { useState } from "react"
import axios from "axios";

import AuthAPI from "../services/authAPI";

const LoginPage = ({onLogin}) => {
    const [credentials, setCredentials] = useState({
        "username": "",
        "password": ""
    });

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
           setError("")
            onLogin(true);
        } catch (e) {
            setError("Aucun compte ne possède cette adresse ou alors les informations ne correspondent pas!");
        }
    }

    return (
      <>
          <h1>Connexion à l'application</h1>
          <form onSubmit={handleSubmit}>
              <div className="form-group">
                  <label htmlFor="username">Adresse Email de connexion</label>
                  <input
                      type="email"
                      value={credentials.username}
                      onChange={handleChange}
                      className={"form-control" + (error && " is-invalid")}
                      id="username"
                      name="username"
                      aria-describedby="usernameFeedBack"
                      placeholder="Adresse email"
                  />
              </div>
              {error && <div className="invalid-feedback" id="usernameFeedBack">
                  {error}
              </div>}
              <div className="form-group">
                  <label htmlFor="password">Mot de passe</label>
                  <input
                      type="password"
                      value={credentials.password}
                      onChange={handleChange}
                      className="form-control"
                      id="password"
                      name="password"
                      placeholder="Mot de passe"
                  />
              </div>
              <button type="submit" className="btn btn-success">Je me connecte</button>
          </form>
      </>
    );
};

export default LoginPage;