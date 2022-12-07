import React, { useState } from "react";
import Field from "../components/forms/Field";
import {Link} from "react-router-dom";
import UserApi from "../services/UserApi";
import {toast} from "react-toastify";

const RegisterPage = ({history}) => {

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: ""
    });

    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: ""
    });


    const handleChange = ({currentTarget}) => {
        const { name, value } = currentTarget;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const apiErrors = {};

        if (user.password !== user.passwordConfirm) {
            apiErrors.passwordConfirm = "Le mot de passe n'est pas identique";
            setErrors(apiErrors);
            toast.error("Il y a des erreurs dans votre formulaire !");

            return;
        }
        
        try {
            toast.success("Vous êtes désormais inscrit, vous pouvez vous connecter !");
            await UserApi.register(user);
            setErrors({});
            history.replace("/login");
        } catch ({response}) {
            const { violations } = response.data;
            if (violations) {
                violations.forEach(({propertyPath, message}) => {
                    apiErrors[propertyPath] = message;
                });
                setErrors(apiErrors);
                toast.error("Il y a des erreurs dans votre formulaire !");
            }
        }
    };

    return (
    <>
        <h1>Inscription</h1>
        <form onSubmit={handleSubmit}>
            <Field
                name="firstName"
                label="Prénom"
                placeHolder="Votre prénom"
                error={errors.firstName}
                value={user.firstName}
                onChange={handleChange}
            />
            <Field
                name="lastName"
                label="Nom"
                placeHolder="Votre nom"
                error={errors.lastName}
                value={user.lastName}
                onChange={handleChange}
            />
            <Field
                name="email"
                label="Email"
                placeHolder="Votre email"
                error={errors.email}
                value={user.email}
                type="email"
                onChange={handleChange}
            />
            <Field
                name="password"
                label="Mot de passe"
                type="password"
                placeHolder="Votre mot de passe"
                error={errors.password}
                value={user.password}
                onChange={handleChange}
            />
            <Field
                name="passwordConfirm"
                label="Confirmation de mot passe"
                type="password"
                placeHolder="Confirmer votre mot de passe"
                error={errors.passwordConfirm}
                value={user.passwordConfirm}
                onChange={handleChange}
            />

            <div className="form-group">
                <button type="submit" className="btn btn-success">Confirmation</button>
                <Link to="/login" className="btn btn-link">J'ai déjà un compte</Link>
            </div>

        </form>
    </>
  );
}
export default RegisterPage;