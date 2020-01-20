import React from 'react'

const Nav = props => {
    return (
        <nav className="nav blue darken-4">
            <a href="/" className="brand-logo left">Potluck</a>

            <ul id="nav-mobile" className="right">
                <li>{props.data ? <a href="/" onClick={props.click}>Log out</a> : <a href="/" onClick={props.click}>Log in</a>}</li>
            </ul>
        </nav>
    )
}

export default Nav