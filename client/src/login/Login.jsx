import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import toast from 'react-hot-toast';
import "../App.css";

const Login = () => {
    const [user, setUser] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const inputHandler = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const submitForm = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/api/user/login", user);

            localStorage.setItem("token", response.data.token);

            toast.success("Welcome Back!", { position: "top-right" });

            navigate("/dashboard");
        } catch (error) {
            toast.error("Invalid Email or Password", { position: "top-right" });
        }
    };

    return (
        <div className='addUser'>
            <div className="glass-card-form">
                <center><h3>Welcome Back</h3></center>

                <form className='addUserForm' onSubmit={submitForm}>
                    <div className="inputGroup">
                        <label htmlFor="email">Email Address</label>
                        <input type="email" onChange={inputHandler} id="email" name="email" placeholder='Enter your email' required />
                    </div>
                    <div className="inputGroup">
                        <label htmlFor="password">Password</label>
                        <input type="password" onChange={inputHandler} id="password" name="password" placeholder='Enter your password' required />
                    </div>
                    <button type="submit" className="submit-btn">Login</button>
                    <div className="form-footer">
                        <span>New to Vault Guard? </span>
                        <Link to="/signup">Sign Up</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
