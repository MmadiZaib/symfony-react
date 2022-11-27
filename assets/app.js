import React, {useState} from 'react';
import ReactDOM from 'react-dom';
/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.css';

// start the Stimulus application
import './bootstrap';

import NavBar from "./js/components/NavBar";

import HomePage from "./js/pages/HomePage";
import CustomersPage from "./js/pages/CustomersPage";
import InvoicesPage from "./js/pages/InvoicesPage";
import LoginPage from "./js/pages/LoginPage";
import AuthAPI from "./js/services/authAPI";
import AuthContext from "./js/contexts/AuthContext";
import PrivateRoute from "./js/components/PrivateRoute";

import { HashRouter, Switch , Route, withRouter } from "react-router-dom";
//import CustomersPageWithPagination from "./js/pages/CustomersPageWithPagination";


AuthAPI.setup();

const App = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(AuthAPI.istAuthenticated());
    const NavBarWithRouter = withRouter(NavBar);

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            setIsAuthenticated
        }}>
            <HashRouter>
                <NavBarWithRouter />
                <main className="container pt-5">
                    <Switch>
                        <Route path="/login" component={LoginPage} />
                        <PrivateRoute path="/invoices" component={InvoicesPage}
                        />
                        <PrivateRoute path="/customers" component={CustomersPage}
                        />
                        <Route path="/" component={HomePage} />
                    </Switch>
                </main>
            </HashRouter>
        </AuthContext.Provider>
    );
};

const rootElement = document.querySelector('#app');
ReactDOM.render(<App/>, rootElement)