import { TextField, Typography, Box, Button } from '@mui/material'
import getMobxReactFormValidation from '../../Shared/MobxValidation/MobxReactFormValidation'
import { useEffect, useMemo, useState } from 'react'
import { inject, observer } from 'mobx-react'
import { IUser } from '../../Shared/Interfaces/user.interface'
import { Link, useNavigate } from 'react-router-dom'
import { loginFields } from './login.fields'
import { toast } from 'react-toastify'
import { IEmployee } from '../../Shared/Interfaces/employee.interface'
import { employeesListData, usersListData } from '../../Shared/Utils/Constant'
import localStorageService from '../../Shared/Services/localStorage.service'

const LoginForm = () => {
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
        const returnedEmployeesList = localStorageService.checkEmployeesList()
        const returnedUsersList = localStorageService.checkUsersList()

        if (!returnedEmployeesList)
            localStorageService.setEmployeesList(employeesListData)
        if (!returnedUsersList) localStorageService.setUsersList(usersListData)

        const employeesList: IEmployee[] =
            localStorageService.getEmployeesList()
        const usersList: IUser[] = localStorageService.getUsersList()
        const usersListMap = usersList.reduce((total, item) => {
            total[item.email] = item.block
            return total
        }, {})
        const updatedEmployeesList = employeesList.map((item) => ({
            ...item,
            block: usersListMap[item.email] || item.block,
        }))

        localStorageService.setEmployeesList(updatedEmployeesList)
    }, [users])

    const blockUnblock = (loginUser: IUser): IUser[] => {
        const returnedUsersList: IUser[] = localStorageService.getUsersList()
        const updatedUsersList = returnedUsersList.map((el) => {
            if (el.email === loginUser.email) {
                el.block = loginUser.block
                el.blockCount = loginUser.blockCount
            }
            return el
        })
        localStorageService.setUsersList(updatedUsersList)
        localStorageService.setLoginUser(loginUser)
        return updatedUsersList
    }

    const handleSubmit = () => {
        const { email, password } = form.values()
        const returnedUsersList: IUser[] = localStorageService.getUsersList()
        const loginUser = returnedUsersList.find((el) => el.email === email)

        if (!loginUser) {
            toast.error('User not found!.')
            return
        }
        if (loginUser.admin && loginUser.password !== password) {
            toast.error('Login failed. Check your credentials.')
            return
        }
        if (loginUser.block) {
            toast.error('You have tried max number of limit. You are blocked..')
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
}

export default inject('employeeStore')(observer(LoginForm))
