import { Box } from '@mui/material'
import Heading from './Heading'
import EmployeesList from './EmployeesList'
import { IEmployee } from '../../../Shared/Interfaces/employee.interface'
import Searchbar from './Searchbar'

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
}: Props) => {
    const onFilterChange = (searchQuery: string) => {
        const data = employeesList.filter((e) => {
            const nameResults = (e.firstName + e.lastName)
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
            const emailResults = e.email
                .toLowerCase()
                .includes(searchQuery.toLowerCase())

            return nameResults || emailResults
        })

        setFilteredList(data)
    }
    return (
        <Box width='100%' pl={30} mx={6}>
            <Box display='flex' gap={12} alignItems='center'>
                <Heading />
                <Searchbar onFilterChange={onFilterChange} />
            </Box>
            <EmployeesList
                filteredList={filteredList}
                setFilteredList={setFilteredList}
            />
        </Box>
    )
}

export default MainContainer
