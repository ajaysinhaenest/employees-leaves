import { useState, useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import Sidebar from './Components/Sidebar/Sidebar'
import MainContainer from './Components/MainContainer/MainContainer'
import AddEmployeeForm from './Components/AddEmployeeForm/AddEmployeeForm'
import { IEmployee } from '../../Shared/Interfaces/employee.interface'
import { employeesListData } from '../../Shared/Utils/Constant'
const Dashboard = () => {
    const [open, setOpen] = useState(false)
    const [employeesList, setEmployeesList] = useState<IEmployee[]>([])

    useEffect(() => {
        // localStorage.setItem('employeesList', JSON.stringify(employeesListData))
        const employeesListData = JSON.parse(
            localStorage.getItem('employeesList') || 'null',
        )
        setEmployeesList(employeesListData)
    }, [])

    return (
        <Box display='flex'>
            <Sidebar open={open} setOpen={setOpen} />
            <MainContainer
                employeesList={employeesList}
                setEmployeesList={setEmployeesList}
            />
            <AddEmployeeForm
                open={open}
                setOpen={setOpen}
                employeesList={employeesList}
                setEmployeesList={setEmployeesList}
            />
        </Box>
    )
}

export default Dashboard
