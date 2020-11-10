import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import Login from './auth/Login'
import Register from './auth/Register'
import ActivationEmail from './auth/ActivationEmail'
import { useSelector } from 'react-redux/'
import NotFound from '../utils/notfound'
import Home from './home'
import ForgotPassword from './auth/ForgotPassword'
import ResetPassword from './auth/ResetPassword'
import Profile from './profile'
import EditUser from './profile/edit-user'

Body.propTypes = {}

function Body(props) {
    const auth = useSelector((state) => state.auth)
    const isLogged = auth.isLogged
    return (
        <section>
            <Switch>
                <Route path="/" exact component={Home}></Route>
                <Route path="/forgot" exact component={ForgotPassword}></Route>
                <Route
                    path="/user/reset/:token"
                    exact
                    component={ResetPassword}
                ></Route>
                <Route
                    path="/profile"
                    exact
                    component={isLogged ? Profile : Home}
                ></Route>
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
                <Route
                    path="/edit_user/:id"
                    exact
                    component={isLogged ? EditUser : Home}
                ></Route>
            </Switch>
        </section>
    )
}

export default Body
