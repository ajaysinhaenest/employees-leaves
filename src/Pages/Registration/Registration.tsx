import { Box, Container, Button, Typography, styled } from '@mui/material'
import Admin from './Components/Admin'
import User from './Components/User'
import { useState } from 'react'
import RegistrationForm from './Components/RegistrationForm'

const StyledButton = styled(Button)({
    borderRadius: 0,
    margin: 5,
})

const Registration = () => {
    const [isAdmin, setIsAdmin] = useState(false)
    return (
        <Container>
            <Box
                borderRadius={1}
                mx='auto'
                my={20}
                width={360}
                p={2}
                bgcolor='white'
            >
                <Typography
                    textAlign='center'
                    mb={2}
                    variant='h5'
                    color='initial'
                >
                    Registration As
                </Typography>
                <Box display='flex' justifyContent='center' mb={2}>
                    <StyledButton
                        color='secondary'
                        sx={{
                            borderBottom:
                                isAdmin === false ? '2px solid gray' : '',
                        }}
                        size='small'
                        onClick={() => setIsAdmin(false)}
                    >
                        <Typography variant='subtitle2'>User</Typography>
                    </StyledButton>
                    <StyledButton
                        sx={{
                            borderBottom:
                                isAdmin === true ? '2px solid gray' : '',
                        }}
                        size='small'
                        variant='text'
                        color='secondary'
                        onClick={() => setIsAdmin(true)}
                    >
                        Admin
                    </StyledButton>
                </Box>
                <RegistrationForm isAdmin={isAdmin} />
                {/* {isAdmin === 'user' && <User />}
                {isAdmin === 'admin' && <Admin />} */}
            </Box>
        </Container>
    )
}

export default Registration
