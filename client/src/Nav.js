import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => (
    <nav className="">
        <ul className="nav nav-tabs">
            <li style={{ fontSize: "20px" }} className="nav-item pr-3 pt-3 pb-1">
                <Link to="/">Contacts </Link>
            </li>
            <li style={{ fontSize: "20px" }} className="nav-item pr-3 pt-3 pb-1 pl-3">
                <Link to="/create">Create New Contact</Link>
            </li>
        </ul>
    </nav>
);

export default Nav;