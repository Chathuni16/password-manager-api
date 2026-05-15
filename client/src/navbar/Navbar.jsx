import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

   
    const hideNavbar = location.pathname === "/login" || location.pathname === "/signup";
    if (hideNavbar) return null;

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <div className="nav-logo">
                <span className="logo-icon">🛡️</span>
                <h2>My Secure Vault</h2>
            </div>
            <ul className="nav-links">
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/add">Add New</Link></li>
                <li><Link to="/view">View All</Link></li>
                <li>
                    <button onClick={handleLogout} className="logout-btn">
                        Logout
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
