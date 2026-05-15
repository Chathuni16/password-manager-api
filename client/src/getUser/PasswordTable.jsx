import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";

const PasswordTable = () => {
    const [passwords, setPasswords] = useState([]);
    const [visiblePasswords, setVisiblePasswords] = useState({});
    const navigate = useNavigate();

    const toggleVisibility = (id) => {
        setVisiblePasswords((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    navigate("/login");
                    return;
                }

                const response = await axios.get("http://localhost:8000/api/passwords/getall", {
                    headers: {
                        Authorization: token
                    }
                });
                setPasswords(response.data);
            } catch (error) {
                console.log("Error fetching data", error);

                if (error.response && error.response.status === 401) {
                    navigate("/login");
                }
            }
        };
        fetchData();
    }, [navigate]);

    const deletePassword = async (passwordId) => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                navigate("/login");
                return;
            }

            await axios.delete(`http://localhost:8000/api/passwords/delete/${passwordId}`, {
                headers: {
                    Authorization: token
                }
            });

            setPasswords((prevPasswords) => prevPasswords.filter((p) => p._id !== passwordId));
            toast.success("Password Deleted Successfully!", { position: "top-right" });

        } catch (error) {
            console.log(error);
            toast.error("Failed to delete password");

            if (error.response && error.response.status === 401) {
                navigate("/login");
            }
        }
    };

    return (
        <div className='userTable'>
            <div className="table-header">
                <h3>Key Station</h3>
                <Link to="/add" className="add-link-btn">+ New Entry</Link>
            </div>
            {passwords.length === 0 ? (
                <div className="no-records">
                    <p>No records yet. Start by adding a new password!</p>
                </div>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>S.No.</th>
                            <th>Website Name</th>
                            <th>Username</th>
                            <th>Password</th>
                            <th>Category</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {passwords.map((password, index) => (
                            <tr key={password._id}>
                                <td>{index + 1}</td>
                                <td>{password.websiteName}</td>
                                <td>{password.username}</td>
                                <td>
                                    <div className="password-cell">
                                        <span>{visiblePasswords[password._id] ? password.password : "••••••••"}</span>
                                        <button className="eye-btn" onClick={() => toggleVisibility(password._id)}>
                                            {visiblePasswords[password._id] ? "👁️" : "👁️‍🗨️"}
                                        </button>
                                    </div>
                                </td>
                                <td>
                                    <span className="category-badge">{password.category}</span>
                                </td>
                                <td className='actionButtons'>
                                    <button onClick={() => deletePassword(password._id)} className="deleteBtn">Delete</button>
                                    <Link to={`/edit/` + password._id} className="editBtn">Edit</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default PasswordTable;
