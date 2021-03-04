import React from 'react'
import './NavLinks.css'
import {NavLink} from 'react-router-dom';
import {AuthContext} from '../../util/context/auth-context';
import {useContext} from 'react';
const NavLinks = (props) => {
    const auth = useContext(AuthContext)
    return (
        <ul className={`nav-links ${props.className}`}>
            {!auth.isLoggedIn && <li>
                <NavLink to="/signup">SIGN UP</NavLink>
            </li>}
            {!auth.isLoggedIn && <li>
                <NavLink to="/login">LOGIN</NavLink>
            </li>}
            {auth.isLoggedIn && <li>
                <NavLink to="/">LOGOUT</NavLink>
            </li>}
            {<li><NavLink to="/profile">PROFILE</NavLink></li>}
            <li>
                <NavLink to="/discover">DISCOVER</NavLink>
            </li>
        </ul>
    )
}

export default NavLinks
