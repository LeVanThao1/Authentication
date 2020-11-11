import axios from 'axios'
import React, { useState } from 'react'
import FacebookLogin from 'react-facebook-login'
import { GoogleLogin } from 'react-google-login'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { dispatchLogin } from '../../../redux/action/authAction'
import { showErrMsg, showSuccessMsg } from '../../utils/notification'
import './style.css'

Login.propTypes = {}

const initialState = {
    email: '',
    password: '',
    error: '',
    success: '',
}

function Login(props) {
    const [user, setUser] = useState(initialState)

    const { email, password, err, success } = user

    const dispatch = useDispatch()
    const history = useHistory()

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            const res = await axios.post('/user/login', { email, password })
            setUser({ ...user, err: '', success: res.data.msg })

            localStorage.setItem('firstLogin', true)
            // console.log(res)
            dispatch(dispatchLogin())
            history.push('/')
        } catch (err) {
            err.response.data.msg &&
                setUser({ ...user, err: err.response.data.msg, success: '' })
        }
    }

    const handleChangeInput = (e) => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value, err: '', success: '' })
    }

    const responseGoogle = async (response) => {
        try {
            const res = await axios.post('/user/google_login', {
                tokenId: response.tokenId,
            })
            setUser({ ...user, error: '', success: res.data.msg })
            localStorage.setItem('firstLogin', true)
            dispatch(dispatchLogin())
            history.push('/')
        } catch (err) {
            err.response.data.msg &&
                setUser({ ...user, err: err.response.data.msg, success: '' })
        }
    }

    const responseFacebook = async (response) => {
        try {
            const { accessToken, userID } = response
            console.log(accessToken, userID)
            if (!accessToken || !userID) {
                setUser({ ...user, error: 'Login fail with facebook' })
            } else {
                const res = await axios.post('/user/facebook_login', {
                    accessToken,
                    userID,
                })
                setUser({ ...user, error: '', success: res.data.msg })
                localStorage.setItem('firstLogin', true)
                dispatch(dispatchLogin())
                history.push('/')
            }
        } catch (err) {
            console.log(err)
            err.response.data.msg &&
                setUser({ ...user, err: err.response.data.msg, success: '' })
        }
    }

    return (
        <div className="login_page">
            <h2>Login</h2>
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email Address</label>
                    <input
                        type="text"
                        placeholder="Enter email address"
                        id="email"
                        value={email}
                        name="email"
                        onChange={handleChangeInput}
                    />
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        placeholder="Enter password"
                        id="password"
                        value={password}
                        name="password"
                        onChange={handleChangeInput}
                    />
                </div>

                <div className="row">
                    <button type="submit">Login</button>
                    <Link to="/forgot_password">Forgot your password?</Link>
                </div>
            </form>

            <div className="hr">Or Login With</div>

            <div className="social">
                <GoogleLogin
                    clientId="495868402334-hv0mqs9mh0u9ip19krurch7thn6a5n15.apps.googleusercontent.com"
                    buttonText="Login with google"
                    onSuccess={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />

                <FacebookLogin
                    appId="2803467413259426"
                    autoLoad={false}
                    fields="name,email,picture"
                    callback={responseFacebook}
                />
            </div>

            <p>
                New Customer? <Link to="/register">Register</Link>
            </p>
        </div>
    )
}

export default Login
