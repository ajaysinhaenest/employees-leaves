import { Badge, Box, Typography } from '@mui/material'
import { Mail } from '@mui/icons-material'
import Heading from './Heading'
import EmployeesList from './EmployeesList'
import { IEmployee } from '../../../Shared/Interfaces/employee.interface'
import Searchbar from './Searchbar'
import { useState } from 'react'
import LeavesNotification from './LeavesNotification'

interface Props {
    employeesList: IEmployee[]
    setEmployeesList: React.Dispatch<React.SetStateAction<IEmployee[]>>
    filteredList: IEmployee[]
    setFilteredList: React.Dispatch<React.SetStateAction<IEmployee[]>>
}

const MainContainer = ({
    filteredList,
    setFilteredList,
    employeesList,
    setEmployeesList,
}: Props) => {
    const [isNotificationOpen, setIsNotificationOpen] = useState(false)

    const handleFilter = (e: React.FormEvent, q: string) => {
        e.preventDefault()

        const data = employeesList.filter((e) => {
            const nameResults = (e.firstName + e.lastName)
                .toLowerCase()
                .includes(q.toLowerCase())
            const emailResults = e.email.toLowerCase().includes(q.toLowerCase())

            return nameResults || emailResults
        })

        setFilteredList(data)
    }
    // console.log(filteredList)
    return (
        <Box width='100%' pl={30} mx={6}>
            <Box display='flex' gap={12} alignItems='center'>
                <Heading />
                <Searchbar handleFilter={handleFilter} />
            </Box>
            <EmployeesList
                filteredList={filteredList}
                setFilteredList={setFilteredList}
            />
        </Box>
    )
}

export default MainContainer
