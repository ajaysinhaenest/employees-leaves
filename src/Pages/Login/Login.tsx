import { Box, Container, Button, Typography, styled } from '@mui/material'
import LoginForm from './Components/LoginForm'

const Login = () => {
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
                    Login
                </Typography>
                <LoginForm />
            </Box>
        </Container>
    )
}

export default Login
