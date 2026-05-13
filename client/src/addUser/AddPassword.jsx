import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import toast from "react-hot-toast";

const AddPassword = () => {
    const [password, setPassword] = useState({
        websiteName: "",
        username: "",
        password: "",
        category: ""
    });
    const navigate = useNavigate();

    const inputHandler = (e) => {
        const { name, value } = e.target;
        setPassword({ ...password, [name]: value });
    }

    const submitForm = async (e) => {
        e.preventDefault();
        await axios.post("/api/passwords/create", password)
            .then(() => {
                toast.success("Password added successfully!", { position: "top-right" });
                navigate("/");
            })
            .catch(error => console.log(error));
    }

    return (
        <div className='addPassword'>
            <Link to={"/"} className="backBtn">← Back to Dashboard</Link>
            <h3>Add New Entry</h3>
            <form onSubmit={submitForm}>
                <input type="text" onChange={inputHandler} name="websiteName" placeholder='Website Name' required />
                <input type="text" onChange={inputHandler} name="username" placeholder='Username' required />
                <input type="password" onChange={inputHandler} name="password" placeholder='Password' required />
                <input type="text" onChange={inputHandler} name="category" placeholder='Category (Work, Social, etc.)' />
                <button type="submit">SAVE PASSWORD</button>
            </form>
        </div>
    )
}

export default AddPassword;