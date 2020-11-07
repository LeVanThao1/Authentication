import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import Login from './auth/Login'
import Register from './auth/Register'
import ActivationEmail from './auth/ActivationEmail'
import { useSelector } from 'react-redux/'
import NotFound from '../utils/notfound'
import Home from './home'

Body.propTypes = {}

function Body(props) {
    const auth = useSelector((state) => state.auth)
    const isLogged = auth.isLogged
    return (
        <section>
            <Switch>
                <Route path="/" exact component={Home}></Route>
                <Route
                    path="/login"
                    exact
                    component={isLogged ? Home : Login}
                ></Route>
                <Route
                    path="/register"
                    exact
                    component={isLogged ? Home : Register}
                ></Route>
                <Route
                    path="/user/activate/:activation_token"
                    exact
                    component={ActivationEmail}
                ></Route>
            </Switch>
        </section>
    )
}

export default Body
