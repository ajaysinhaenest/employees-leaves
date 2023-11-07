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
}

const AddEmployeeForm: FC<Props> = observer(
    ({ open, setOpen, employeesList, setEmployeesList }: Props) => {
        // const [employeesList, setEmployeesList] = useState<IEmployee[]>([])
        const [, setUsers] = useState([])
        const form = useMemo(
            () => getMobxReactFormValidation(employeeFields),
            [],
        )

        useEffect(() => {
            const storedEmployeesList = JSON.parse(
                localStorage.getItem('employeesList') || 'null',
            )

            setEmployeesList(storedEmployeesList)

            const storedData = localStorage.getItem('users')
            if (storedData) {
                setUsers(JSON.parse(storedData))
            }
        }, [])

        const handleAddEmployee = (e: React.FormEvent) => {
            e.preventDefault()
            form.values()

            form.submit({
                onSuccess: () => {
                    console.log('hello world')

                    setEmployeesList((prev) => [
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
                    form.clear()
                    setOpen(false)

                    // if (form.values()) {
                    //     setUsers((prevState) => [
                    //         ...prevState,

                    //     ])

                    //     localStorage.setItem(
                    //         'users',
                    //         JSON.stringify([
                    //             ...users,
                    //             { ...form.values(), notifications: [] },
                    //         ]),
                    //     )

                    //     localStorage.setItem(
                    //         'login_user',
                    //         JSON.stringify({
                    //             ...form.values(),
                    //             notifications: [],
                    //         }),
                    //     )
                    // } else {
                    //     setUsers((prevState) => [...prevState])

                    //     localStorage.setItem(
                    //         'users',
                    //         JSON.stringify([...users, form.values()]),
                    //     )

                    //     localStorage.setItem(
                    //         'login_user',
                    //         JSON.stringify(form.values()),
                    //     )
                    // }
                    // alert('User registered successfully.')
                    // form.reset()
                },
                onError: (error: string) => console.log(error),
            })
        }
        console.log(employeesList)
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
