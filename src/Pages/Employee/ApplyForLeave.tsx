import { useState } from 'react'
import {
    Box,
    Button,
    Modal,
    TextField,
    styled,
    Typography,
} from '@mui/material'
import { toast } from 'react-toastify'
import { IUser } from '../../Shared/Interfaces/user.interface'
import { IEmployee } from '../../Shared/Interfaces/employee.interface'
import { randomDateFunction } from '../../Shared/Utils/helperFunctions'

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
    isApply: boolean
    setIsApply: React.Dispatch<React.SetStateAction<boolean>>
}

const ApplyForLeave = ({ user, isApply, setIsApply }: Props) => {
    const [subject, setSubject] = useState('')

    const handleApplyForLeave = () => {
        const users: IUser[] =
            JSON.parse(localStorage.getItem('users') || '') || []
        const employees: IEmployee[] =
            JSON.parse(localStorage.getItem('employeesList') || '') || []

        console.log(users)
        console.log(employees)
        // debugger
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

        const updatedUsers = users.map((u) => {
            if (u.email === user.email) {
                u.appliedLeaves = [...u.appliedLeaves, data]
            }
            return u
        })

        const updatedEmployees = employees.map((el) => {
            if (el.email === user.email) {
                el.appliedLeaves = [...el.appliedLeaves, data]
            }
            return el
        })

        localStorage.setItem('employeesList', JSON.stringify(updatedEmployees))

        localStorage.setItem('users', JSON.stringify(updatedUsers))

        setSubject('')
        // debugger
        console.log('updated Employees', updatedEmployees)
        console.log('updated users', updatedUsers)
        // debugger
    }

    return (
        <StyledModal
            open={isApply}
            onClose={() => setIsApply(false)}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
        >
            <Box width={400} bgcolor='white' p={3} borderRadius={4}>
                <Typography
                    mb={6}
                    textAlign='center'
                    variant='h5'
                    color='initial'
                >
                    Available Leaves: {user.availableLeaves}
                </Typography>
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
                        sx={{ marginBottom: 12 }}
                    />

                    <Button
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
