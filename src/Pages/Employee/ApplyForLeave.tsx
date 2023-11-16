import { useState } from 'react'
import {
    Box,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Modal,
    TextField,
    styled,
    Typography,
} from '@mui/material'
import { toast } from 'react-toastify'
import { IUser } from '../../Shared/Interfaces/user.interface'
import { IEmployee } from '../../Shared/Interfaces/employee.interface'
import { randomDateFunction } from '../../Shared/Utils/helperFunctions'
import CancelIcon from '@mui/icons-material/Cancel'
import localStorageService from '../../Shared/Services/localStorage.service'

const StyledModal = styled(Modal)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 0,
    outline: 0,
    '&:focus': {
        outline: 0,
    },
})

interface Props {
    user: IUser
    setUser: React.Dispatch<React.SetStateAction<IUser>>
    isApply: boolean
    setIsApply: React.Dispatch<React.SetStateAction<boolean>>
}

const ApplyForLeave = ({ user, setUser, isApply, setIsApply }: Props) => {
    const [subject, setSubject] = useState('')

    const handleApplyForLeave = () => {
        const employees: IEmployee[] = localStorageService.getEmployeesList()
        const users: IUser[] = localStorageService.getUsersList()

        if (subject === '') {
            toast.error('Kindly Provide your subject.')
            return
        }
        const date = randomDateFunction()
        const data = {
            name: user.firstName + ' ' + user.lastName,
            email: user.email,
            subject: subject,
            date: date,
            status: 'pending',
            disapproveComment: '',
        }
        const updatedLoginUser = {
            ...user,
            availableLeaves: user.availableLeaves - 1,
            appliedLeaves: [...user.appliedLeaves, data],
        }
        const updatedUsersList = users.map((u) =>
            u.email === user.email ? updatedLoginUser : u,
        )
        const updatedEmployeesList = employees.map((el) =>
            el.email === user.email ? updatedLoginUser : el,
        )

        localStorageService.setEmployeesList(updatedEmployeesList)
        localStorageService.setUsersList(updatedUsersList)
        localStorageService.setLoginUser(updatedLoginUser)

        setUser(updatedLoginUser)
        setSubject('')
    }

    return (
        <StyledModal
            open={isApply}
            onClose={() => setIsApply(false)}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
        >
            <Box width={800} bgcolor='white' p={3} borderRadius={4}>
                <Box
                    sx={{
                        cursor: 'pointer',
                    }}
                    color='gray'
                    onClick={() => setIsApply(false)}
                    display='flex'
                    justifyContent='right'
                >
                    <CancelIcon />
                </Box>
                <Typography
                    textAlign='center'
                    variant='h6'
                    color='initial'
                    mb={2}
                >
                    Leaves Details
                </Typography>
                <Box display='flex' gap={1} mb={2}>
                    <Typography
                        textAlign='center'
                        variant='subtitle1'
                        color='initial'
                    >
                        Total Leaves: {user.leaves}
                    </Typography>
                    <Typography
                        textAlign='center'
                        variant='subtitle1'
                        color='initial'
                    >
                        Available Leaves: {user.availableLeaves}
                    </Typography>
                    <Typography
                        textAlign='center'
                        variant='subtitle1'
                        color='initial'
                    >
                        Applied Leaves: {user.appliedLeaves.length}
                    </Typography>
                </Box>
                <Typography variant='h6' textAlign='center' mb={2}>
                    Applied Leaves Details
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Applied Date</TableCell>
                                <TableCell>Subject</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Comment</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {user.appliedLeaves.map((el, index) => (
                                <TableRow key={index}>
                                    <TableCell>{el.name}</TableCell>
                                    <TableCell>{el.email}</TableCell>
                                    <TableCell>{el.date}</TableCell>
                                    <TableCell>{el.subject}</TableCell>
                                    <TableCell>{el.status}</TableCell>
                                    <TableCell>
                                        {el.disapproveComment}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {/* </Box> */}
                <Typography variant='h6' color='initial'>
                    Apply for leave:
                </Typography>
                <form>
                    <TextField
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        size='small'
                        color='primary'
                        variant='outlined'
                        fullWidth
                        margin='normal'
                        label='Subject'
                        sx={{ marginBottom: 2 }}
                    />

                    <Button
                        disabled={!user.availableLeaves}
                        size='small'
                        variant='contained'
                        color='success'
                        fullWidth
                        onClick={handleApplyForLeave}
                    >
                        Apply
                    </Button>
                </form>
            </Box>
        </StyledModal>
    )
}

export default ApplyForLeave
