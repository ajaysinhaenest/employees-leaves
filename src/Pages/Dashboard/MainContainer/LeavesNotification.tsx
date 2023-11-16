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
import localStorageService from '../../../Shared/Services/localStorage.service'
import { leaveStatusEnum } from '../../../Shared/Enums/leaveStatus.enum'

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
    filteredUser: IEmployee
    setFilteredUser: React.Dispatch<React.SetStateAction<IEmployee>>
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const LeavesNotification = ({
    filteredUser,
    appliedLeavesData,
    setAppliedLeaves,
    open,
    setOpen,
}: Props) => {
    const [commentQuery, setCommentQuery] = useState('')
    const [reject, setReject] = useState('')

    const onApproveDisapproveLeave = (sub: string, btnQuery: string) => {
        if (btnQuery === leaveStatusEnum.REJECTED) {
            setReject(sub)
            return
        }
        const employeesList: IEmployee[] =
            localStorageService.getEmployeesList()
        const users: IUser[] = localStorageService.getUsersList()
        const totalLeaves =
            employeesList.find((el) => el.email === filteredUser.email)
                ?.appliedLeaves || []
        const updatedAppliedLeaves = totalLeaves.map((el) => {
            if (el.subject === sub && btnQuery === leaveStatusEnum.APPROVED) {
                el.status = leaveStatusEnum.APPROVED
            }
            if (
                el.subject === sub &&
                btnQuery === leaveStatusEnum.ADD_COMMENT
            ) {
                el.status = leaveStatusEnum.ADD_COMMENT
                el.disapproveComment = commentQuery
            }
            return el
        })
        setAppliedLeaves(updatedAppliedLeaves)
        const updatedFilteredData = {
            ...filteredUser,
            appliedLeaves: updatedAppliedLeaves,
        }

        const updatedEmployeesList = employeesList.map((el) =>
            el.email === filteredUser.email ? updatedFilteredData : el,
        )
        const updatedUsersList = users.map((el) =>
            el.email === filteredUser.email ? updatedFilteredData : el,
        )
        localStorageService.setEmployeesList(updatedEmployeesList)
        localStorageService.setUsersList(updatedUsersList)

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
                    sx={{ cursor: 'pointer' }}
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
                                <Typography variant='subtitle1' color='initial'>
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
                                            onClick={() => {
                                                onApproveDisapproveLeave(
                                                    el.subject,
                                                    leaveStatusEnum.REJECTED,
                                                )
                                            }}
                                        >
                                            Reject
                                        </Button>
                                        <Button
                                            size='small'
                                            variant='outlined'
                                            color='success'
                                            onClick={() => {
                                                onApproveDisapproveLeave(
                                                    el.subject,
                                                    leaveStatusEnum.APPROVED,
                                                )
                                            }}
                                        >
                                            Approve
                                        </Button>
                                    </Box>
                                )}
                            </Box>
                            {reject === el.subject && (
                                <>
                                    <TextField
                                        value={commentQuery}
                                        onChange={(e) =>
                                            setCommentQuery(e.target.value)
                                        }
                                        size='small'
                                        placeholder='Enter your comment'
                                    />
                                    <Button
                                        onClick={() => {
                                            onApproveDisapproveLeave(
                                                el.subject,
                                                leaveStatusEnum.ADD_COMMENT,
                                            )
                                        }}
                                    >
                                        Submit
                                    </Button>
                                </>
                            )}
                        </Box>
                    ))}
                </Box>
            </Box>
        </StyledModal>
    )
}

export default inject('employeeStore')(observer(LeavesNotification))
