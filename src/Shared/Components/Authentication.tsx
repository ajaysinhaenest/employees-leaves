import { useEffect, useState } from 'react'
import { Navigate, Outlet, Route, Routes, useNavigate } from 'react-router-dom'
import { IUser } from '../Interfaces/user.interface'
import Dashboard from '../../Pages/Dashboard/Dashboard'
import Employee from '../../Pages/Employee/Employee'

const Authentication = () => {
    const [loginUser, setLoginUser] = useState<IUser>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        admin: false,
        block: false,
        blockCount: 0,
        leaves: 0,
        availableLeaves: 0,
        appliedLeaves: [],
        disapproveLeavesComments: [],
    })
    const navigate = useNavigate()

    useEffect(() => {
        const user = localStorage.getItem('loginUser')
        if (!user) navigate('/')

        try {
            const loginUser: IUser = JSON.parse(user || '')
            setLoginUser(loginUser)
        } catch (error) {
            console.error('Error parsing JSON:', error)
        }
    }, [])

    loginUser.admin ? navigate('/dashboard') : navigate('/employee')

    return (
        <Routes>
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='employee' element={<Employee />} />
        </Routes>
    )
}

export default Authentication
