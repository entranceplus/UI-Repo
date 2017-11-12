/**
 * This is the configuration file for routing.
 * All the routes in the application need to be placed here
 * 
 * author      Arjita Mitra
 */

import React from 'react';
import Dashboard from '../components/Dashboard';
import { Provider } from 'react-redux';
import { Route, BrowserRouter } from 'react-router-dom';
import Login from '../components/Login'

const Root = ({ store }) => (
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <Route exact path="/" component={Dashboard}/> 
                <Route path="dashboard">
                    <Route path='/dashboard' component={Dashboard} />
                </Route>
                <Route path="logout">
                    <Route path='/logout' component={Login} />
                </Route>
            </div>
        </BrowserRouter>
    </Provider>
)

export default Root