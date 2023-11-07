import { IEmployee } from '../../../../../Shared/Interfaces/employee.interface'
import {
    TextField,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material'
import { inject, observer } from 'mobx-react'
import { useState } from 'react'

interface Props {
    employeesList: IEmployee[]
    setEmployeesList: React.Dispatch<React.SetStateAction<IEmployee[]>>
}
const EmployeesList = observer(({ employeesList, setEmployeesList }: Props) => {
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
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employeesList?.map((employee, index) => (
                            <TableRow key={index}>
                                <TableCell>{employee.firstName}</TableCell>
                                <TableCell>{employee.lastName}</TableCell>
                                <TableCell>{employee.email}</TableCell>
                                <TableCell>{employee.leaves}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
})

export default inject('employeeStore')(EmployeesList)
