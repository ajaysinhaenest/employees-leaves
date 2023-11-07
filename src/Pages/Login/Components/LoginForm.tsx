import { TextField, Typography, Box, Button } from '@mui/material'
import getMobxReactFormValidation from '../../../Shared/MobxValidation/MobxReactFormValidation'
import { useMemo } from 'react'
import { inject, observer } from 'mobx-react'
import { IUser } from '../../../Shared/Interfaces/registration.interface'
import { Link, useNavigate } from 'react-router-dom'
import { loginFields } from '../Fields/login.fields'
import { toast } from 'react-toastify'

const LoginForm = observer(({ store }: any) => {
    // const [users, setUsers] = useState([])
    const navigate = useNavigate()
    const form = useMemo(() => getMobxReactFormValidation(loginFields), [])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const { email, password } = form.values()

        const storedUsers = JSON.parse(localStorage.getItem('users') || 'null')

        const login_user: IUser[] = storedUsers?.filter(
            (el: IUser, i: number) => {
                return el.email === email
            },
        )
        console.log(login_user)

        if (login_user?.length) {
            if (
                login_user[0]?.email === email &&
                login_user[0]?.password === password
            ) {
                localStorage.setItem('login_user', JSON.stringify(login_user))

                if (login_user[0].admin) {
                    navigate('/dashboard')
                } else {
                    navigate('/employee')
                }
                form.clear()
                return null
            } else {
                toast.error('Login failed. Check your credentials.')
                return null
            }
        }
        toast.error('user does not exist')
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

export default inject('store')(LoginForm)
