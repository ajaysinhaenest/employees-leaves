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
import getMobxReactFormValidation from '../../../../Shared/MobxValidation/MobxReactFormValidation'
import { employeeFields } from './Fields/employee.fields'
import { IEmployee } from '../../../../Shared/Interfaces/employee.interface'
import { EmployeeStore } from '../../../../Shared/Stores/employee.store'
import { IUser } from '../../../../Shared/Interfaces/user.interface'
import { toast } from 'react-toastify'

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
        const [users, setUsers] = useState<IUser[]>([])
        const form = useMemo(
            () => getMobxReactFormValidation(employeeFields),
            [],
        )

        useEffect(() => {
            const storedEmployeesList = JSON.parse(
                localStorage.getItem('employeesList') || 'null',
            )

            setEmployeesList(storedEmployeesList)
            setFilteredList(storedEmployeesList)

            const storedUsers = localStorage.getItem('users')
            if (storedUsers) {
                setUsers(JSON.parse(storedUsers))
            }
        }, [])

        const handleAddEmployee = (e: React.FormEvent) => {
            e.preventDefault()
            // console.log(form.values())
            const { email, password } = form.values()
            const storedData = JSON.parse(
                localStorage.getItem('employeesList') || 'null',
            )
            const employee = storedData.filter(
                (el: IEmployee) => el.email === email,
            )

            if (employee?.length) {
                toast.error('employee already exist with that email')
                return null
            }

            form.submit({
                onSuccess: () => {
                    console.log('hello world')

                    setEmployeesList((prev) => [
                        ...prev,
                        { ...form.values(), admin: false },
                    ])
                    setFilteredList((prev) => [
                        ...prev,
                        { ...form.values(), admin: false },
                    ])

                    localStorage.setItem(
                        'employeesList',
                        JSON.stringify([
                            ...employeesList,
                            { ...form.values(), admin: false },
                        ]),
                    )
                    setUsers((prevState): IUser[] => [
                        ...prevState,
                        {
                            name:
                                form.values().firsName +
                                ' ' +
                                form.values().lastName,
                            email: form.values().email,
                            password: form.values().password,
                            admin: false,
                            blockCount: 0,
                            block: false,
                        },
                    ])
                    localStorage.setItem(
                        'users',
                        JSON.stringify([
                            ...users,
                            {
                                name:
                                    form.values().firstName +
                                    ' ' +
                                    form.values().lastName,
                                email: form.values().email,
                                password: form.values().password,
                                admin: false,
                            },
                        ]),
                    )
                    form.clear()
                    setOpen(false)
                },
                onError: (error: string) => console.log(error),
            })
        }
        // console.log(employeesList)
        return (
            <StyledModal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
            >
                <Box width={400} bgcolor='white' p={3} borderRadius={4}>
                    <Typography variant='h6' color='gray' textAlign='center'>
                        Add new Employee
                    </Typography>
                    <form>
                        <TextField
                            size='small'
                            color='primary'
                            variant='outlined'
                            fullWidth
                            margin='normal'
                            {...form.$('firstName').bind()}
                        />

                        {/* <Typography color='error' sx={{ mb: 1 }}>
                        {form.$('title').error}
                    </Typography> */}
                        <TextField
                            size='small'
                            color='primary'
                            variant='outlined'
                            fullWidth
                            margin='normal'
                            {...form.$('lastName').bind()}
                        />
                        {/* <Typography color='error' sx={{ mb: 1 }}>
                        {form.$('description').error}
                    </Typography> */}
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
                        {/* <Typography color='error' sx={{ mb: 1 }}>
                        {form.$('date').error}
                    </Typography> */}

                        <Button
                            variant='contained'
                            color='secondary'
                            fullWidth
                            type='submit'
                            onClick={(e) => handleAddEmployee(e)}
                        >
                            Add Employee
                        </Button>
                    </form>
                </Box>
            </StyledModal>
        )
    },
)

export default inject('employeeStore')(AddEmployeeForm)
