import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import App from './App'
import Create from './Create'
import UpdateContact from './UpdateContact'

// Pages' Routes
const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={App} />
                <Route path="/create" exact component={Create} />
                <Route path="/contact/update/:_id" exact component={UpdateContact} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;