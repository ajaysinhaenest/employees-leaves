import { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { IUser } from '../Interfaces/user.interface'
import Dashboard from '../../Pages/Dashboard/Dashboard'
import Employee from '../../Pages/Employee/Employee'
import localStorageService from '../Services/localStorage.service'

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
        const user = localStorageService.checkLoginUser()
        if (!user) navigate('/')

        try {
            const returnedUser = localStorageService.getLoginUser() || loginUser
            setLoginUser(returnedUser)
        } catch (error) {
            console.error('Error parsing JSON:', error)
        }
    }, [])

    // loginUser.admin ? navigate('/dashboard') : navigate('/employee')

    return (
        <Routes>
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='employee' element={<Employee />} />
        </Routes>
    )
}

export default Authentication
