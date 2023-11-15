import { useEffect, useState } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { IUser } from '../Interfaces/user.interface'

const PrivateRoute = () => {
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

    // loginUser.admin ? navigate('/dashboard') : navigate('/employee')

    return <Outlet />
}

export default PrivateRoute
