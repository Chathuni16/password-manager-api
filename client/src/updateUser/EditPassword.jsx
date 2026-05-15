import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import toast from "react-hot-toast";

const EditPassword = () => {
    const [password, setPassword] = useState({
        websiteName: "",
        username: "",
        password: "",
        category: ""
    });
    const { id } = useParams();
    const navigate = useNavigate();

    const inputHandler = (e) => {
        const { name, value } = e.target;
        setPassword({ ...password, [name]: value });
    }

    useEffect(() => {
        const fetchPassword = async () => {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    navigate("/login");
                    return;
                }

                const response = await axios.get(`http://localhost:8000/api/passwords/getone/${id}`, {
                    headers: {
                        Authorization: token
                    }
                });
                setPassword(response.data);
            } catch (error) {
                console.log(error);
                toast.error("Failed to load password entry");

                if (error.response && error.response.status === 401) {
                    navigate("/login");
                }
            }
        };

        fetchPassword();
    }, [id, navigate]);

    const submitForm = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                navigate("/login");
                return;
            }

            await axios.put(`http://localhost:8000/api/passwords/update/${id}`, password, {
                headers: {
                    Authorization: token
                }
            });

            toast.success("Password updated successfully!", { position: "top-right" });
            navigate("/view");
        } catch (error) {
            console.log(error);
            toast.error("Failed to update password");

            if (error.response && error.response.status === 401) {
                navigate("/login");
            }
        }
    }

    return (
        <div className='addPassword'>
            <Link to={"/"} className="backBtn">← Cancel</Link>
            <h3>Update Entry</h3>
            <form onSubmit={submitForm}>
                <input type="text" value={password.websiteName} onChange={inputHandler} name="websiteName" placeholder='Website Name' />
                <input type="text" value={password.username} onChange={inputHandler} name="username" placeholder='Username' />
                <input type="password" value={password.password} onChange={inputHandler} name="password" placeholder='Password' />
                <input type="text" value={password.category} onChange={inputHandler} name="category" placeholder='Category' />
                <button type="submit">UPDATE PASSWORD</button>
            </form>
        </div>
    )
}

export default EditPassword;
