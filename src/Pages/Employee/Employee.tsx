import { useState, useEffect } from 'react'
import { Box, Container, Typography, Button } from '@mui/material'

const Employee = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        admin: false,
        leaves: 0,
        password: '',
        block: false,
        blockCount: 0,
    })
    const [changePassword, setChangePassword] = useState(false)
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('login_user') || 'null')

        setUser({
            name: user[0].firstName + ' ' + user[0].lastName,
            email: user[0].email,
            admin: user[0].admin,
            leaves: user[0].leaves,
            password: user[0].password,
            block: user[0].block,
            blockCount: user[0].blockCount,
        })
    }, [])
    console.log(user)
    return (
        <Container>
            <Box
                borderRadius={1}
                mx='auto'
                my={20}
                width={400}
                p={3}
                bgcolor='white'
            >
                <Typography
                    textAlign='center'
                    mb={2}
                    variant='h5'
                    color='initial'
                >
                    Employee Profile
                </Typography>
                <Box>
                    <Typography>Name: {user.name}</Typography>
                    <Typography>Email: {user.email}</Typography>
                    <Typography>Total No. of leaves: {user.leaves}</Typography>
                    <Typography>
                        Status: {user.block ? 'blocked' : 'active'}
                    </Typography>
                </Box>
                <Box textAlign='center' mt={5}>
                    <Button
                        variant='contained'
                        color='secondary'
                        size='small'
                        fullWidth
                    >
                        Change Password
                    </Button>
                </Box>
                {/* <Box>

                </Box> */}
            </Box>
        </Container>
    )
}

export default Employee
