// File: /src/components/Navbar.jsx

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/userContext'; 

function Navbar() {
    const { user, logout } = useContext(UserContext);
    console.log('User context: Navbar', user); // Log user context to check role

    return (
        <nav className='navbar-container'>
            <Link to="/">Home</Link>
            {user ? (
                <>
                    <Link to="/dashboard">Dashboard</Link>
                    {user.role === 'admin' && ( // Conditionally render the Register link for admin
                        <Link to="/register">Register</Link> // added line
                    )}
                    <button onClick={logout}>Logout</button>
                </>
            ) : (
                <>
                    <Link to="/login">Login</Link>
                </>
            )}
        </nav>
    );
}

export default Navbar;
