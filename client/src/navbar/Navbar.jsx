import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="nav-logo">
                <span className="logo-icon">🛡️</span>
                <h2>My Secure Vault</h2>
            </div>
            <ul className="nav-links">
                <li><Link to="/">Dashboard</Link></li>
                <li><Link to="/add">Add New</Link></li>
                <li><Link to="/view">View All</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;