import { BrowserRouter as Router } from 'react-router-dom'
import Header from './components/header'
import Body from './components/body'
import { useDispatch, useSelector } from 'react-redux'
import {
    dispatchGetUser,
    dispatchLogin,
    fetchUser,
} from './redux/action/authAction'
import axios from 'axios'
import { useEffect } from 'react'

function App() {
    const dispatch = useDispatch()
    const token = useSelector((state) => state.token)
    const auth = useSelector((state) => state.auth)

    useEffect(() => {
        const firstLogin = localStorage.getItem('firstLogin')

        if (firstLogin) {
            const getToken = async () => {
                const res = await axios.post('/user/refresh_token', null)
                dispatch({ type: 'GET_TOKEN', payload: res.data.access_token })
            }
            getToken()
        }
    }, [auth.isLogged, dispatch])

    useEffect(() => {
        if (token) {
            const getUser = () => {
                dispatch(dispatchLogin())
                return fetchUser(token).then((res) => {
                    dispatch(dispatchGetUser(res))
                })
            }
            getUser()
        }
    }, [token, dispatch])

    return (
        <Router>
            <div className="App">
                <Header />
                <Body />
            </div>
        </Router>
    )
}

export default App
