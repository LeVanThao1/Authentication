import React, { Fragment, Suspense, useEffect, useContext, memo } from 'react'
import { Redirect } from 'react-router-dom'

function PrivateRoute(props) {
    if (!props.isAuthenticated) return <Redirect to="/login" />
    return (
        <Fragment>
            <div>{props.children}</div>
        </Fragment>
    )
}

export default memo(PrivateRoute)
