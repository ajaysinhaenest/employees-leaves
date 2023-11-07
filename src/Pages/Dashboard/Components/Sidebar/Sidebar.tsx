import { Box, Typography, Button } from '@mui/material'

interface Props {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Sidebar = ({ open, setOpen }: Props) => {
    return (
        <Box position='fixed' height='100%' sx={{ bgcolor: '#5db1d7' }}>
            <Box px={3} py={1} sx={{ bgcolor: '#00b1b8' }}>
                <Typography variant='h4' color='white'>
                    Simple Admin
                </Typography>
            </Box>
            <Box bgcolor='white' mt={1} px={3} py={1}>
                <Typography variant='h5' color='green'>
                    Dashboard
                </Typography>
            </Box>

            <Box mt={2} mx={1} px={2} py={1}>
                <Button
                    variant='outlined'
                    color='secondary'
                    onClick={() => setOpen(!open)}
                >
                    Add new Employee
                </Button>
            </Box>
        </Box>
    )
}

export default Sidebar
