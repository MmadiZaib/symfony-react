import React from "react";

const CustomersPage = (props) => {
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
                    <tr>
                        <td>12</td>
                        <td>
                            <a href="#">Mmadi Zaib</a>
                        </td>
                        <td>mmadi@mail.io</td>
                        <td>Mmadi Inc</td>
                        <td className="text-center">
                            <span className="badge bg-primary">4</span>
                        </td>
                        <td className="text-center">2 400,00 €</td>
                        <td>
                            <button className="btn btn-sm btn-danger">Supprimer</button>
                        </td>
                    </tr>
                </tbody>


            </table>
        </>

    );
}

export default CustomersPage;