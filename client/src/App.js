import React, { Suspense, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Header from './components/header'
import { useDispatch, useSelector } from 'react-redux'
import {
    dispatchGetUser,
    dispatchLogin,
    fetchUser,
} from './redux/action/authAction'
import axios from 'axios'
import routes from './config/routes'
import PrivateRoute from './components/PrivateRoute'
import PublicRoute from './components/PublicRoute'
import NotFound from './components/utils/notfound'
import Home from './pages/Home'

const Components = {}

for (const c of routes) {
    Components[c.component] = React.lazy(() => import('./pages/' + c.component))
}

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
                    console.log(res)
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
                <Switch>
                    {routes.map((route) => {
                        const C = Components[route.component]
                        return (
                            <Route
                                key={route.path}
                                path={route.path}
                                exact={true}
                                render={() =>
                                    route.isProtected ? (
                                        <PrivateRoute
                                            isAuthenticated={auth.isLogged}
                                        >
                                            <Suspense fallback={null}>
                                                <C />
                                            </Suspense>
                                        </PrivateRoute>
                                    ) : (
                                        <PublicRoute
                                            isAuthenticated={auth.isLogged}
                                        >
                                            <Suspense fallback={null}>
                                                <C />
                                            </Suspense>
                                        </PublicRoute>
                                    )
                                }
                            />
                        )
                    })}
                    <Route
                        path="*"
                        render={() => (
                            <Suspense fallback={null}>
                                <NotFound />
                            </Suspense>
                        )}
                    ></Route>
                </Switch>
            </div>
        </Router>
    )
}

export default App
