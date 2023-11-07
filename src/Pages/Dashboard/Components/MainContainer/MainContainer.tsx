import { Box, Typography } from '@mui/material'
import Heading from './Components/Heading'
import EmployeesList from './Components/EmployeesList'
import { IEmployee } from '../../../../Shared/Interfaces/employee.interface'

interface Props {
    employeesList: IEmployee[]
    setEmployeesList: React.Dispatch<React.SetStateAction<IEmployee[]>>
}

const MainContainer = ({ employeesList, setEmployeesList }: Props) => {
    return (
        <Box width='100%' pl={30} mx={6}>
            <Heading />
            <EmployeesList
                employeesList={employeesList}
                setEmployeesList={setEmployeesList}
            />
        </Box>
    )
}

export default MainContainer
