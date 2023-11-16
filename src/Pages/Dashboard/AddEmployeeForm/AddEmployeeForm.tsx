import { useState, useEffect, FC } from 'react'
import {
    Box,
    Button,
    Modal,
    TextField,
    Typography,
    styled,
} from '@mui/material'
import { inject, observer } from 'mobx-react'
import { useMemo } from 'react'
import getMobxReactFormValidation from '../../../Shared/MobxValidation/MobxReactFormValidation'
import { employeeFields } from './employee.fields'
import { IEmployee } from '../../../Shared/Interfaces/employee.interface'
import { EmployeeStore } from '../../../Shared/Stores/employee.store'
import { IUser } from '../../../Shared/Interfaces/user.interface'
import { toast } from 'react-toastify'
import CancelIcon from '@mui/icons-material/Cancel'
import localStorageService from '../../../Shared/Services/localStorage.service'

const StyledModal = styled(Modal)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    '&:focus': {
        outline: 'none',
    },
})

interface Props {
    employeeStore?: EmployeeStore
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    employeesList: IEmployee[]
    setEmployeesList: React.Dispatch<React.SetStateAction<IEmployee[]>>
    filteredList: IEmployee[]
    setFilteredList: React.Dispatch<React.SetStateAction<IEmployee[]>>
}

const AddEmployeeForm: FC<Props> = observer(
    ({
        open,
        setOpen,
        employeesList,
        setEmployeesList,
        filteredList,
        setFilteredList,
    }: Props) => {
        const [usersList, setUsersList] = useState<IUser[]>([])
        const form = useMemo(
            () => getMobxReactFormValidation(employeeFields),
            [],
        )

        useEffect(() => {
            const returnedUsersList = localStorageService.getUsersList()
            setUsersList(returnedUsersList)
        }, [])

        const handleAddEmployee = () => {
            const { email } = form.values()
            const returnedEmployeesList: IEmployee[] =
                localStorageService.getEmployeesList()
            const employee = returnedEmployeesList.find(
                (el) => el.email === email,
            )

            if (employee?.email) {
                toast.error('employee already exist with that email')
                return
            }
            form.submit({
                onSuccess: () => {
                    const data = {
                        ...form.values(),
                        leaves: Number(form.values().leaves),
                        admin: false,
                        block: false,
                        blockCount: 0,
                        availableLeaves: Number(form.values().leaves),
                        appliedLeaves: [],
                        disapproveLeavesComments: [],
                    }
                    setFilteredList((prev) => [...prev, { ...data }])
                    setEmployeesList((prev) => [...prev, { ...data }])
                    setUsersList((prevState) => [
                        ...prevState,
                        {
                            ...data,
                        },
                    ])

                    localStorageService.setEmployeesList([
                        ...filteredList,
                        { ...data },
                    ])
                    localStorageService.setUsersList([
                        ...usersList,
                        { ...data },
                    ])
                    form.clear()
                    setOpen(false)
                },
                onError: (error: string) => console.log(error),
            })
        }
        return (
            <StyledModal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
            >
                <Box width={400} bgcolor='white' p={3} borderRadius={4}>
                    <Box
                        sx={{
                            cursor: 'pointer',
                        }}
                        color='gray'
                        onClick={() => setOpen(false)}
                        display='flex'
                        justifyContent='right'
                    >
                        <CancelIcon />
                    </Box>
                    <Typography variant='h6' color='gray' textAlign='center'>
                        Add new Employee
                    </Typography>
                    <Box>
                        <TextField
                            size='small'
                            color='primary'
                            variant='outlined'
                            fullWidth
                            margin='normal'
                            {...form.$('firstName').bind()}
                        />
                        <TextField
                            size='small'
                            color='primary'
                            variant='outlined'
                            fullWidth
                            margin='normal'
                            {...form.$('lastName').bind()}
                        />
                        <TextField
                            size='small'
                            color='primary'
                            variant='outlined'
                            fullWidth
                            margin='normal'
                            {...form.$('email').bind()}
                        />
                        <TextField
                            size='small'
                            color='primary'
                            variant='outlined'
                            fullWidth
                            margin='normal'
                            {...form.$('password').bind()}
                        />
                        <TextField
                            size='small'
                            color='primary'
                            variant='outlined'
                            fullWidth
                            margin='normal'
                            {...form.$('leaves').bind()}
                        />
                        <Button
                            variant='contained'
                            color='secondary'
                            fullWidth
                            onClick={handleAddEmployee}
                        >
                            Add Employee
                        </Button>
                    </Box>
                </Box>
            </StyledModal>
        )
    },
)

export default inject('employeeStore')(AddEmployeeForm)
