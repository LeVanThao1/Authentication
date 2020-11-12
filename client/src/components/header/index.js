import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './style.css'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'

Header.propTypes = {}

function Header(props) {
    const auth = useSelector((state) => state.auth)
    const [menu, setMenu] = useState(false)
    const { user, isLogged } = auth

    const handleLogout = async () => {
        try {
            await axios.get('/user/logout')
            localStorage.removeItem('firstLogin')
            window.location.href = '/'
        } catch (err) {
            window.location.href = '/'
        }
    }

    const userLink = () => {
        return (
            <li className="drop-nav">
                <Link to="#" className="avatar">
                    <img src={user.avatar} alt="" /> {user.name}{' '}
                    <i className="fas fa-angle-down"></i>
                </Link>
                <ul className="dropdown">
                    <li>
                        <Link to="/profile">Profile</Link>
                    </li>
                    <li>
                        <Link to="/history">History</Link>
                    </li>
                    <li>
                        <Link to="/" onClick={handleLogout}>
                            Logout
                        </Link>
                    </li>
                </ul>
            </li>
        )
    }

    // const transForm = {
    //     transform: isLogged ? 'translateY(10px)' : 'translateY(0px)',
    // }
    return (
        <header>
            <div className="menu" onClick={() => setMenu(!menu)}>
                <img src={Menu} alt="" width="30px" />
            </div>
            <div className="logo">
                <h1>
                    <Link to="/">{auth.isAdmin ? 'ADMIN' : 'THAOLV SHOP'}</Link>
                </h1>
            </div>
            <ul></ul>
        </header>

        // <header>
        //     <div className="logo">
        //         <h1>
        //             <Link to="/">{auth.isAdmin ? 'ADMIN' : 'THAOLV SHOP'}</Link>
        //         </h1>
        //     </div>

        //     <ul>
        //         <li>
        //             <Link to="/">{auth.isAdmin ? 'Products' : 'Shop'}</Link>
        //         </li>
        //         <li>
        //             {isLogged ? (
        //                 userLink()
        //             ) : (
        //                 <li>
        //                     <Link to="/login">
        //                         <i className="fas fa-user"></i> Login * Register
        //                     </Link>
        //                 </li>
        //             )}
        //         </li>
        //         {auth.Admin ? (
        //             ''
        //         ) : (
        //             <li>
        //                 <Link to="/">
        //                     <i className="fas fa-shopping-cart"></i> Cart
        //                 </Link>
        //             </li>
        //         )}
        //     </ul>
        // </header>
    )
}

export default Header
