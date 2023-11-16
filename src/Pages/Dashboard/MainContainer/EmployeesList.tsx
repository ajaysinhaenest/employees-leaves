import { useState } from 'react'
import { IEmployee } from '../../../Shared/Interfaces/employee.interface'
import {
    Button,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
} from '@mui/material'
import { inject, observer } from 'mobx-react'
import { IUser } from '../../../Shared/Interfaces/user.interface'
import LeavesNotification from './LeavesNotification'
import localStorageService from '../../../Shared/Services/localStorage.service'

interface ILeaves {
    name: string
    email: string
    subject: string
    date: string
    status: string
}

interface Props {
    filteredList: IEmployee[]
    setFilteredList: React.Dispatch<React.SetStateAction<IEmployee[]>>
}

const EmployeesList = ({ filteredList, setFilteredList }: Props) => {
    const [appliedLeaves, setAppliedLeaves] = useState<ILeaves[]>([])
    const [filteredUser, setFilteredUser] = useState<IEmployee>({
        firstName: '',
        lastName: '',
        email: '',
        admin: false,
        leaves: 0,
        availableLeaves: 0,
        password: '',
        block: false,
        blockCount: 0,
        appliedLeaves: [],
        disapproveLeavesComments: [],
    })

    const [isNotificationOpen, setIsNotificationOpen] = useState(false)

    const unBlockUser = (user: any) => {
        const employeesList: IEmployee[] =
            localStorageService.getEmployeesList()
        const users: IUser[] = localStorageService.getUsersList()
        const updatedUser = { ...user, block: false }
        const updatedEmployeesList = employeesList.map((el) =>
            el.email === user.email ? updatedUser : el,
        )
        const updatedUsersList = users.map((el) =>
            el.email === user.email ? updatedUser : el,
        )

        localStorageService.setEmployeesList(updatedEmployeesList)
        localStorageService.setUsersList(updatedUsersList)
        localStorageService.setLoginUser(updatedUser)
    }

    const handleAppliedLeaves = (email: string) => {
        setIsNotificationOpen(!isNotificationOpen)
        const filteredData = filteredList.find((el) => el.email === email)
        if (filteredData) {
            setAppliedLeaves(filteredData.appliedLeaves)
            setFilteredUser(filteredData)
        }
    }

    return (
        <Box mt={1}>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Total Leaves</TableCell>
                            <TableCell>available Leaves</TableCell>
                            <TableCell>Applied Leaves</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredList.map((employee, index) => (
                            <TableRow key={index}>
                                <TableCell>{employee.firstName}</TableCell>
                                <TableCell>{employee.lastName}</TableCell>
                                <TableCell>{employee.email}</TableCell>
                                <TableCell>{employee.leaves}</TableCell>
                                <TableCell>
                                    {employee.availableLeaves}
                                </TableCell>
                                <TableCell>
                                    <Button
                                        size='small'
                                        variant='outlined'
                                        color='success'
                                        onClick={() =>
                                            handleAppliedLeaves(employee.email)
                                        }
                                    >
                                        Leaves Details
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    {employee.block ? (
                                        <Box display='flex' gap={1}>
                                            <Typography
                                                variant='subtitle2'
                                                color='initial'
                                            >
                                                Not Active
                                            </Typography>
                                            <Button
                                                size='small'
                                                onClick={() =>
                                                    unBlockUser(employee)
                                                }
                                            >
                                                UnBlock
                                            </Button>
                                        </Box>
                                    ) : (
                                        'Active'
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <LeavesNotification
                appliedLeavesData={appliedLeaves}
                setAppliedLeaves={setAppliedLeaves}
                filteredUser={filteredUser}
                setFilteredUser={setFilteredUser}
                open={isNotificationOpen}
                setOpen={setIsNotificationOpen}
            />
        </Box>
    )
}

export default inject('employeeStore')(observer(EmployeesList))
