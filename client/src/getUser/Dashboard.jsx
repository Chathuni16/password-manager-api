import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        // ✅ If no token, send back to login
        if (!token) {
            navigate("/login");
        }
    }, [navigate]);

    return (
        <div className="dashboard-container">
            <div className="hero-section">
                <h1>My Secure Vault</h1>
                <p>Manage your passwords safely and simply.</p>
            </div>

            <div className="card-grid">
                <Link to="/add" className="glass-card">
                    <div className="card-icon">➕</div>
                    <h3>Add Entry</h3>
                    <p>Save a new password</p>
                </Link>

                <Link to="/view" className="glass-card">
                    <div className="card-icon">📂</div>
                    <h3>View All</h3>
                    <p>Manage saved items</p>
                </Link>
            </div>
        </div>
    );
};

export default Dashboard;
