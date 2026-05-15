import './App.css';
import { RouterProvider, createBrowserRouter, Outlet, Navigate } from "react-router-dom";
import PasswordTable from './getUser/PasswordTable';
import AddPassword from './addUser/AddPassword';
import EditPassword from './updateUser/EditPassword';
import Dashboard from './getUser/Dashboard';
import Navbar from './navbar/Navbar';
import { Toaster } from 'react-hot-toast';
import Login from "./login/Login";
import Signup from "./signup/Signup";

// ✅ Outside App - no recreating on every render
const Layout = () => {
    return (
        <div className="main-layout">
            <Navbar />
            <div className="content">
                <Outlet />
            </div>
        </div>
    );
};

// ✅ Outside App - router created only once
const router = createBrowserRouter([
    { path: "/", element: <Navigate to="/login" replace /> },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },
    {
        path: "/",
        element: <Layout />,
        children: [
            { path: "/dashboard", element: <Dashboard /> },
            { path: "/view", element: <PasswordTable /> },
            { path: "/add", element: <AddPassword /> },
            { path: "/edit/:id", element: <EditPassword /> },
        ]
    }
]);

function App() {
    return (
        <div className="App">
            <Toaster />
            <RouterProvider router={router} />
        </div>
    );
}

export default App;