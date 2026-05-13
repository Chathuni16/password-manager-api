import './App.css';
import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import PasswordTable from './getUser/PasswordTable';
import AddPassword from './addUser/AddPassword';
import EditPassword from './updateUser/EditPassword';
import Dashboard from './getUser/Dashboard';
import Navbar from './navbar/Navbar';
import { Toaster } from 'react-hot-toast';

function App() {
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

  const route = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Dashboard /> },
        { path: "/view", element: <PasswordTable /> },
        { path: "/add", element: <AddPassword /> },
        { path: "/edit/:id", element: <EditPassword /> },
      ]
    }
  ]);

  return (
    <div className="App">
       <Toaster />
       <RouterProvider router={route} />
    </div>
  );
}

export default App;