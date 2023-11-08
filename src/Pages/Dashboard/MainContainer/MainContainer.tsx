import { Box, Typography } from '@mui/material'
import Heading from './Components/Heading'
import EmployeesList from './Components/EmployeesList'
import { IEmployee } from '../../../../Shared/Interfaces/employee.interface'
import Searchbar from './Components/Searchbar'
import { useState } from 'react'

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
    // const [filteredList, setFilteredList] = useState<IEmployee[]>(employeesList)

    const handleFilter = (e: React.FormEvent, q: string) => {
        e.preventDefault()

        const data = employeesList.filter((e: IEmployee) => {
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
