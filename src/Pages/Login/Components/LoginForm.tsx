import { TextField, Typography, Box, Button } from '@mui/material'
import getMobxReactFormValidation from '../../../Shared/MobxValidation/MobxReactFormValidation'
import { useEffect, useMemo, useState } from 'react'
import { inject, observer } from 'mobx-react'
import { IUser } from '../../../Shared/Interfaces/registration.interface'
import { Link, useNavigate } from 'react-router-dom'
import { loginFields } from '../Fields/login.fields'
import { toast } from 'react-toastify'

const LoginForm = observer(() => {
    const [users, setUsers] = useState<IUser[]>([])
    const navigate = useNavigate()

    const form = useMemo(() => getMobxReactFormValidation(loginFields), [])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const { email, password } = form.values()

        const storedUsers = JSON.parse(localStorage.getItem('users') || 'null')

        const login_user: IUser[] = storedUsers?.filter(
            (el: IUser, i: number) => {
                return el.email === email || el.password === password
            },
        )
        console.log(login_user)

        if (login_user?.length) {
            if (login_user[0].block === false) {
                if (
                    login_user[0]?.email === email &&
                    login_user[0]?.password === password
                ) {
                    const user: IUser[] = storedUsers.map(
                        (el: IUser, i: number) => {
                            if (el === login_user[0]) {
                                return {
                                    ...el,
                                    block: false,
                                    blockCount: 0,
                                }
                            }
                            return el
                        },
                    )
                    // setUsers(user)
                    localStorage.setItem('users', JSON.stringify(user))

                    localStorage.setItem(
                        'login_user',
                        JSON.stringify(login_user),
                    )

                    if (login_user[0].admin) {
                        navigate('/dashboard')
                    } else {
                        navigate('/employee')
                    }
                    form.clear()
                    return null
                } else {
                    if (login_user[0].blockCount < 2) {
                        toast.error('Login failed. Check your credentials.')
                    } else {
                        toast.error('Login failed. You are blocked..')
                    }

                    const user: IUser[] = storedUsers.map(
                        (el: IUser, i: number) => {
                            if (el === login_user[0]) {
                                if (el.blockCount === 2) {
                                    return {
                                        ...el,
                                        blockCount: 0,
                                        block: true,
                                    }
                                }
                                if (el.blockCount < 2 && el.block === false)
                                    return {
                                        ...el,
                                        blockCount: el.blockCount + 1,
                                    }
                            }
                            return el
                        },
                    )
                    // setUsers(user)
                    localStorage.setItem('users', JSON.stringify(user))
                    return null
                }
            }
        }
        toast.error('user does not exist')
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
                    type='submit'
                    size='small'
                    fullWidth
                    variant='contained'
                    color='secondary'
                    onClick={(e) => handleSubmit(e)}
                >
                    Login
                </Button>
            </form>
        </Box>
    )
})

export default inject('employeeStore')(LoginForm)
