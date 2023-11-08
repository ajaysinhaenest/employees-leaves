import { IEmployee } from '../../../../../Shared/Interfaces/employee.interface'
import {
    TextField,
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
import { useState } from 'react'

interface Props {
    filteredList: IEmployee[]
    setFilteredList: React.Dispatch<React.SetStateAction<IEmployee[]>>
}
const EmployeesList = observer(({ filteredList, setFilteredList }: Props) => {
    const handleBlockUser = (email: string) => {
        const employeesList = JSON.parse(
            localStorage.getItem('employeesList') || 'null',
        )
        const users = JSON.parse(localStorage.getItem('users') || 'null')

        const updatedEmployeesList = employeesList.map(
            (el: IEmployee, i: number) => {
                if (el.email === email) {
                    return {
                        ...el,
                        block: false,
                    }
                }
                return el
            },
        )

        const updatedUsers = users.map((el: IEmployee, i: number) => {
            if (el.email === email) {
                return {
                    ...el,
                    block: false,
                }
            }
            return el
        })

        localStorage.setItem(
            'employeesList',
            JSON.stringify(updatedEmployeesList),
        )

        localStorage.setItem('users', JSON.stringify(updatedUsers))
        setFilteredList(updatedEmployeesList)
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
                            <TableCell>No. of Leaves</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredList?.map((employee, index) => (
                            <TableRow key={index}>
                                <TableCell>{employee.firstName}</TableCell>
                                <TableCell>{employee.lastName}</TableCell>
                                <TableCell>{employee.email}</TableCell>
                                <TableCell>{employee.leaves}</TableCell>
                                <TableCell>
                                    {employee.block ? (
                                        <Box display='flex' gap={1}>
                                            <Typography
                                                variant='subtitle2'
                                                color='initial'
                                            >
                                                Not Active
                                            </Typography>{' '}
                                            <Button
                                                size='small'
                                                onClick={() =>
                                                    handleBlockUser(
                                                        employee.email,
                                                    )
                                                }
                                            >
                                                UnBlock
                                            </Button>
                                        </Box>
                                    ) : (
                                        'Active'
                                    )}

                                    {/* <Button
                                        onClick={() =>
                                            handleBlockUser(employee.email)
                                        }
                                    >
                                        {employee.block ? 'Unblock' : 'Block'}
                                    </Button> */}
                                    {/* {employee.block ? (
                                        <Button onClick={()=>handle} >UnBlock</Button>
                                    ) : (
                                        ''
                                    )} */}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
})

export default inject('employeeStore')(EmployeesList)
