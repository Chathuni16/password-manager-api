import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import toast from 'react-hot-toast';
import "../App.css";

const Signup = () => {
    const [user, setUser] = useState({ name: "", email: "", password: "" });
    const navigate = useNavigate();

    const inputHandler = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    }

    const submitForm = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/api/user/signup", user);
            toast.success(response.data.message, { position: "top-right" });
            navigate("/login");
        } catch (error) {
            toast.error("Signup Failed! Please try again.", { position: "top-right" });
        }
    }

    return (
        <div className='addUser'>
            <div className="glass-card-form">
                <center><h3>Create Account</h3></center>
               
                <form className='addUserForm' onSubmit={submitForm}>
                    <div className="inputGroup">
                        <label htmlFor="name">Full Name</label>
                        <input type="text" onChange={inputHandler} id="name" name="name" placeholder='Enter your name' required />
                    </div>
                    <div className="inputGroup">
                        <label htmlFor="email">Email Address</label>
                        <input type="email" onChange={inputHandler} id="email" name="email" placeholder='Enter your email' required />
                    </div>
                    <div className="inputGroup">
                        <label htmlFor="password">Password</label>
                        <input type="password" onChange={inputHandler} id="password" name="password" placeholder='Create a password' required />
                    </div>
                    <button type="submit" className="submit-btn">Sign Up</button>
                    <div className="form-footer">
                        <span>Already have an account? </span>
                        <Link to="/login">Login</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup;