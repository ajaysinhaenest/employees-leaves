import { TextField, Typography, Box } from '@mui/material'

const User = () => {
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
                        placeholder='Enter your name'
                        id='outlined-basic'
                        variant='outlined'
                    />
                </Box>
                <Box display='flex' mb={2}>
                    <Typography variant='h6' mr={2} color='initial'>
                        Email:
                    </Typography>
                    <TextField
                        size='small'
                        fullWidth
                        placeholder='Enter your name'
                        id='outlined-basic'
                        variant='outlined'
                    />
                </Box>
                <Box display='flex'>
                    <Typography variant='h6' mr={2} color='initial'>
                        Password:
                    </Typography>
                    <TextField
                        size='small'
                        fullWidth
                        placeholder='Enter your name'
                        id='outlined-basic'
                        variant='outlined'
                    />
                </Box>
            </form>
        </Box>
    )
}

export default User
