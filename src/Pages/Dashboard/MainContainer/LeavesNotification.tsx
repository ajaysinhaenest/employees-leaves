import { useState } from 'react'
import {
    Box,
    Button,
    Modal,
    TextField,
    styled,
    Typography,
} from '@mui/material'
import { inject, observer } from 'mobx-react'
import { IEmployee } from '../../../Shared/Interfaces/employee.interface'
import { IUser } from '../../../Shared/Interfaces/user.interface'
import CancelIcon from '@mui/icons-material/Cancel'

interface ILeaves {
    name: string
    email: string
    subject: string
    date: string
    status: string
}

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
    appliedLeavesData: ILeaves[]
    setAppliedLeaves: React.Dispatch<React.SetStateAction<ILeaves[]>>
    filteredData: IEmployee
    setFilteredData: React.Dispatch<React.SetStateAction<IEmployee>>
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const LeavesNotification = observer(
    ({
        filteredData,
        setFilteredData,
        appliedLeavesData,
        setAppliedLeaves,
        open,
        setOpen,
    }: Props) => {
        const [commentQuery, setCommentQuery] = useState('')
        const [reject, setReject] = useState('')

        const handleApprove = (sub: string) => {
            const employeesList: IEmployee[] = JSON.parse(
                localStorage.getItem('employeesList') || '',
            )
            const users: IUser[] = JSON.parse(
                localStorage.getItem('users') || '',
            )

            const totalLeaves =
                employeesList.find((el) => el.email === filteredData.email)
                    ?.appliedLeaves || []

            console.log(totalLeaves)

            const updatedAppliedLeaves = totalLeaves.map((el) => {
                if (el.subject === sub) {
                    el.status = 'approved'
                }
                return el
            })

            setAppliedLeaves(updatedAppliedLeaves)

            const updatedFilteredData = {
                ...filteredData,
                appliedLeaves: updatedAppliedLeaves,
            }

            const updatedEmployeesList = employeesList.map((el) => {
                if (el.email === filteredData.email) {
                    return updatedFilteredData
                }
                return el
            })

            const updatedUsers = users.map((el) => {
                if (el.email === filteredData.email) {
                    return updatedFilteredData
                }
                return el
            })
            console.log(updatedEmployeesList)
            console.log(updatedUsers)

            localStorage.setItem(
                'employeesList',
                JSON.stringify(updatedEmployeesList),
            )

            localStorage.setItem('users', JSON.stringify(updatedUsers))
        }

        const handleReject = (sub: string) => {
            setReject(sub)
            console.log('reject')
        }

        const handleComment = (sub: string) => {
            const employeesList: IEmployee[] = JSON.parse(
                localStorage.getItem('employeesList') || '',
            )
            const users: IUser[] = JSON.parse(
                localStorage.getItem('users') || '',
            )

            const totalLeaves =
                employeesList.find((el) => el.email === filteredData.email)
                    ?.appliedLeaves || []

            console.log(totalLeaves)

            const updatedAppliedLeaves = totalLeaves.map((el) => {
                if (el.subject === sub) {
                    el.status = 'rejected'
                    el.disapproveComment = commentQuery
                }
                return el
            })

            setAppliedLeaves(updatedAppliedLeaves)

            const updatedFilteredData = {
                ...filteredData,
                availableLeaves: filteredData.availableLeaves + 1,
                appliedLeaves: updatedAppliedLeaves,
            }

            const updatedEmployeesList = employeesList.map((el) => {
                if (el.email === filteredData.email) {
                    return updatedFilteredData
                }
                return el
            })

            const updatedUsers = users.map((el) => {
                if (el.email === filteredData.email) {
                    return updatedFilteredData
                }
                return el
            })
            console.log(updatedEmployeesList)
            console.log(updatedUsers)

            localStorage.setItem(
                'employeesList',
                JSON.stringify(updatedEmployeesList),
            )

            localStorage.setItem('users', JSON.stringify(updatedUsers))

            setCommentQuery('')
            setReject('')
        }

        return (
            <StyledModal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
            >
                <Box width={400} bgcolor='white' p={3} borderRadius={2}>
                    <Box
                        sx={{
                            cursor: 'pointer',
                        }}
                        color='gray'
                        onClick={() => setOpen(false)}
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
                        Applied Leaves by Employee
                    </Typography>
                    <Box>
                        {!Boolean(appliedLeavesData.length) && (
                            <Typography textAlign='center'>
                                Employee does not applied for leave yet.
                            </Typography>
                        )}
                        {appliedLeavesData.map((el, i) => (
                            <Box key={i} mb={4}>
                                <Box display='flex' gap={4} alignItems='center'>
                                    <Typography
                                        variant='subtitle1'
                                        color='initial'
                                    >
                                        Name: {el.name}
                                    </Typography>
                                    <Typography variant='subtitle2'>
                                        Date: {el.date}
                                    </Typography>
                                </Box>
                                <Box
                                    display='flex'
                                    justifyContent='space-between'
                                    mb={3}
                                >
                                    <Typography variant='subtitle1'>
                                        Subject: {el.subject}
                                    </Typography>

                                    {el.status === 'pending' && (
                                        <Box display='flex' gap={2}>
                                            <Button
                                                size='small'
                                                variant='outlined'
                                                color='error'
                                                onClick={() =>
                                                    handleReject(el.subject)
                                                }
                                            >
                                                Reject
                                            </Button>
                                            <Button
                                                size='small'
                                                variant='outlined'
                                                color='success'
                                                onClick={() =>
                                                    handleApprove(el.subject)
                                                }
                                            >
                                                Approve
                                            </Button>
                                        </Box>
                                    )}
                                </Box>
                                {reject === el.subject && (
                                    <>
                                        <form action=''>
                                            <TextField
                                                value={commentQuery}
                                                onChange={(e) =>
                                                    setCommentQuery(
                                                        e.target.value,
                                                    )
                                                }
                                                size='small'
                                                placeholder='Enter your comment'
                                            />
                                            <Button
                                                onClick={() =>
                                                    handleComment(el.subject)
                                                }
                                            >
                                                Submit
                                            </Button>
                                        </form>
                                    </>
                                )}
                            </Box>
                        ))}
                    </Box>
                </Box>
            </StyledModal>
        )
    },
)

export default inject('employeeStore')(LeavesNotification)
