import { createBrowserRouter, Outlet } from 'react-router-dom'
import Login from './Pages/Login/Login'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Employee from './Pages/Employee/Employee'
import Dashboard from './Pages/Dashboard/Dashboard'
import PrivateRoute from './Shared/Components/PrivateRoute'

function App() {
    return (
        <>
            <Outlet />
            <ToastContainer />
        </>
    )
}

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <Login />,
            },
            {
                path: '/dashboard',
                element: <PrivateRoute />,
                children: [
                    {
                        path: '/dashboard',
                        element: <Dashboard />,
                    },
                ],
            },
            {
                path: '/employee',
                element: <PrivateRoute />,
                children: [
                    {
                        path: '/employee',
                        element: <Employee />,
                    },
                ],
            },
        ],
    },
])

export default App
