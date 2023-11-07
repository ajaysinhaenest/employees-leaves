import { Box, Container, Button, Typography, styled } from '@mui/material'
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
                my={16}
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
                        <Typography variant='subtitle2'>Employee</Typography>
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
            </Box>
        </Container>
    )
}

export default Registration
