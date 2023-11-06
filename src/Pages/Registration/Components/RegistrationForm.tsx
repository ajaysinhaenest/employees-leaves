import { TextField, Typography, Box, Button } from '@mui/material'
import getMobxReactFormValidation from '../../../Shared/MobxValidation/MobxReactFormValidation'
import { useMemo, useState } from 'react'
import { registrationFields } from '../Fields/Registration.fields'
import { inject, observer } from 'mobx-react'
import { IUser } from '../../../Shared/Interfaces/registration.interface'

interface Props {
    store?: any
    isAdmin: boolean
}

const RegistrationForm = observer(({ store, isAdmin }: Props) => {
    const [users, setUsers] = useState<IUser[]>([])

    const form = useMemo(
        () => getMobxReactFormValidation(registrationFields),
        [],
    )
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const { email } = form.values()

        const storedUsers = JSON.parse(localStorage.getItem('users') || 'null')

        const userlogin = storedUsers?.filter((el: IUser, i: number) => {
            return el.email === email
        })

        console.log(userlogin)

        if (userlogin?.length && userlogin[0]?.email) {
            console.log('user already exist')
            alert('email has already been used')
            return null
        }

        form.submit({
            onSuccess: () => {
                let user: IUser
                if (isAdmin) {
                    user = { ...form.values(), admin: true }
                } else {
                    user = { ...form.values(), admin: false }
                }
                console.log(user)

                setUsers((prevState) => [...prevState, { ...user }])

                localStorage.setItem(
                    'users',
                    JSON.stringify([...users, { ...user }]),
                )
                form.clear()
            },
            onError: (error: string) => console.log(error),
        })
    }

    console.log(users)

    return (
        <Box>
            <form action=''>
                <Box display='flex' mb={2}>
                    <Typography variant='h6' mr={2} color='initial'>
                        Name:
                    </Typography>
                    <TextField
                        size='small'
                        fullWidth
                        variant='outlined'
                        {...form.$('name').bind()}
                    />
                </Box>
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
                <Button
                    type='submit'
                    size='small'
                    fullWidth
                    variant='contained'
                    color='secondary'
                    onClick={(e) => handleSubmit(e)}
                >
                    {isAdmin ? ' Register / Admin' : ' Register / User'}
                </Button>
            </form>
        </Box>
    )
})

export default inject('store')(RegistrationForm)
