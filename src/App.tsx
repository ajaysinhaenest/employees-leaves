import { createBrowserRouter, Outlet } from 'react-router-dom'
import Header from './Shared/Components/Header'
import Login from './Pages/Login/Login'
import Registration from './Pages/Registration/Registration'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Employee from './Pages/Employee/Employee'
import Dashboard from './Pages/Dashboard/Dashboard'
function App() {
    return (
        <>
            {/* <Header /> */}
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
                element: <Dashboard />,
            },
            {
                path: '/employee',
                element: <Employee />,
            },
        ],
    },
])

export default App
