import { useState, useEffect } from 'react'
import { Box } from '@mui/material'
import Sidebar from './Sidebar/Sidebar'
import MainContainer from './MainContainer/MainContainer'
import AddEmployeeForm from './AddEmployeeForm/AddEmployeeForm'
import { IEmployee } from '../../Shared/Interfaces/employee.interface'
import { employeesListData, usersListData } from '../../Shared/Utils/Constant'

const Dashboard = () => {
    const [open, setOpen] = useState(false)
    const [employeesList, setEmployeesList] = useState<IEmployee[]>([])
    const [filteredList, setFilteredList] = useState<IEmployee[]>([])

    useEffect(() => {
        // localStorage.setItem('employeesList', JSON.stringify(employeesListData))
        // localStorage.setItem('users', JSON.stringify(usersListData))
        // const updateData = employeesListData.map((data) => {
        //     return {
        //         name: data.firstName + ' ' + data.lastName,
        //         email: data.email,
        //         password: data.password,
        //         admin: false,
        //         block: false,
        //         blockCount: 0,
        //     }
        // })
        // console.log(updateData)
        // localStorage.setItem('users', JSON.stringify(updateData))
        const employeesListData =
            JSON.parse(localStorage.getItem('employeesList') || '') || []

        setEmployeesList(employeesListData)
        setFilteredList(employeesListData)
    }, [])

    return (
        <Box display='flex'>
            <Sidebar open={open} setOpen={setOpen} />
            <MainContainer
                filteredList={filteredList}
                setFilteredList={setFilteredList}
                employeesList={employeesList}
                setEmployeesList={setEmployeesList}
            />
            <AddEmployeeForm
                open={open}
                setOpen={setOpen}
                employeesList={employeesList}
                setEmployeesList={setEmployeesList}
                filteredList={filteredList}
                setFilteredList={setFilteredList}
            />
        </Box>
    )
}

export default Dashboard
