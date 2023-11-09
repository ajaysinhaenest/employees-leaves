import { TextField, Typography, Box, Button } from '@mui/material'
import getMobxReactFormValidation from '../../Shared/MobxValidation/MobxReactFormValidation'
import { useEffect, useMemo, useState } from 'react'
import { inject, observer } from 'mobx-react'
import { IUser } from '../../Shared/Interfaces/user.interface'
import { Link, useNavigate } from 'react-router-dom'
import { loginFields } from './login.fields'
import { toast } from 'react-toastify'
import { IEmployee } from '../../Shared/Interfaces/employee.interface'

const LoginForm = observer(() => {
    const [users, setUsers] = useState<IUser>({
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

    const form = useMemo(() => getMobxReactFormValidation(loginFields), [])

    useEffect(() => {
        const employeesList: IEmployee[] =
            JSON.parse(localStorage.getItem('employeesList') || '') || []

        const users: IUser[] =
            JSON.parse(localStorage.getItem('users') || '') || []

        const secondArrayMap = users.reduce((total, item) => {
            total[item.email] = item.block
            return total
        }, {})

        const updatedFirstArray = employeesList.map((item) => ({
            ...item,
            block: secondArrayMap[item.email] || item.block,
        }))

        localStorage.setItem('employeesList', JSON.stringify(updatedFirstArray))
    }, [users])

    const blockUnblock = (loginUser: IUser): IUser[] => {
        const storedUsers: IUser[] =
            JSON.parse(localStorage.getItem('users') || '') || []
        const users = storedUsers.map((el) => {
            if (el.email === loginUser.email) {
                el.block = loginUser.block
                el.blockCount = loginUser.blockCount
            }
            return el
        })
        localStorage.setItem('users', JSON.stringify(users))
        localStorage.setItem('loginUser', JSON.stringify(loginUser))
        return users
    }

    const handleSubmit = () => {
        const { email, password } = form.values()

        const storedUsers: IUser[] =
            JSON.parse(localStorage.getItem('users') || '') || []

        const loginUser = storedUsers.find((el) => el.email === email)

        if (!loginUser) {
            toast.error('User not found!.')
            return
        }

        if (loginUser.admin) {
            toast.error('Login failed. Check your credentials.')
            toast.error(`hint: ${loginUser.password.slice(0, 8)}`)
            return
        }

        if (loginUser.password !== password) {
            toast.error('Login failed. Check your credentials.')
            loginUser.blockCount = loginUser.blockCount + 1
            if (loginUser.blockCount === 3) {
                loginUser.block = true
                loginUser.blockCount = 0
                toast.error(
                    'You have tried max number of limit. You are blocked..',
                )
            }
            setUsers(loginUser)
            blockUnblock(loginUser)
            return
        }

        // Unblock user if all validation checks passed
        loginUser.block = false
        loginUser.blockCount = 0
        setUsers(loginUser)
        blockUnblock(loginUser)
        navigate(loginUser.admin ? '/dashboard' : '/employee')
        form.clear()
    }

    console.log(users)
    return (
        <Box>
            <form action=''>
                <Box display='flex' mb={2}>
                    <Typography variant='h6' mr={2} color='initial'>
                        Email:
                    </Typography>
                    <TextField
                        size='small'
                        fullWidth
                        {...form.$('email').bind()}
                        variant='outlined'
                    />
                </Box>
                <Box display='flex' mb={2}>
                    <Typography variant='h6' mr={2} color='initial'>
                        Password:
                    </Typography>
                    <TextField
                        size='small'
                        fullWidth
                        variant='outlined'
                        {...form.$('password').bind()}
                    />
                </Box>
                <Typography my={1}>
                    Create Your Account ?
                    <Link to='/' color='error'>
                        <Button color='error'> Register</Button>
                    </Link>
                </Typography>
                <Button
                    size='small'
                    fullWidth
                    variant='contained'
                    color='secondary'
                    onClick={handleSubmit}
                >
                    Login
                </Button>
            </form>
        </Box>
    )
})

export default inject('employeeStore')(LoginForm)
