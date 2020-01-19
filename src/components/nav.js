import React from 'react'

const Nav = () => {
    return (
        <nav className="nav blue darken-4">
            <a href="/" className="brand-logo left">Potluck Co.</a>
            <ul id="nav-mobile" className="right">
                <li><a href="/">Login</a></li>
                <li><a href="/">About</a></li>
                <li><a href="/">Contact</a></li>
            </ul>
        </nav>
    )
}

export default Nav