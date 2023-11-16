import { createBrowserRouter, Outlet } from 'react-router-dom'
import Login from './Pages/Login/Login'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Employee from './Pages/Employee/Employee'
import Dashboard from './Pages/Dashboard/Dashboard'

import Authentication from './Shared/Components/Authentication'
import { employeesListData, usersListData } from './Shared/Utils/Constant'

function App() {
    return (
        <>
            Hello
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
                path: '/*',
                element: <Authentication />,
            },
        ],
    },
])

export default App
