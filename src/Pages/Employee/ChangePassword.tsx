import { Box, Button, Modal, TextField, styled } from '@mui/material'
import { useMemo } from 'react'
import getMobxReactFormValidation from '../../Shared/MobxValidation/MobxReactFormValidation'
import { changePasswordFields } from './changePassword.fields'
import { inject, observer } from 'mobx-react'
import { toast } from 'react-toastify'
import { IUser } from '../../Shared/Interfaces/user.interface'
import { IEmployee } from '../../Shared/Interfaces/employee.interface'
import CancelIcon from '@mui/icons-material/Cancel'

const StyledModal = styled(Modal)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 0,
    outline: 0,
    '&:focus': {
        outline: 0,
    },
})

interface Props {
    user: IUser
    changePassword: boolean
    setChangePassword: React.Dispatch<React.SetStateAction<boolean>>
}

const ChangePassword = observer(
    ({ user, changePassword, setChangePassword }: Props) => {
        const form = useMemo(
            () => getMobxReactFormValidation(changePasswordFields),
            [],
        )

        const handleChangePassword = () => {
            const { oldPassword, newPassword, confirmPassword } = form.values()

            const users: IUser[] =
                JSON.parse(localStorage.getItem('users') || '') || []

            const employees: IEmployee[] =
                JSON.parse(localStorage.getItem('employeesList') || '') || []

            if (
                form.values().oldPassword === '' ||
                form.values().newPassword === '' ||
                form.values().confirmPassword === ''
            ) {
                toast.error('fields are empty')
                return
            }

            if (user.password !== oldPassword) {
                toast.error('old password does not match')
                return
            }

            if (oldPassword === newPassword) {
                toast.error('password has alredy been used!')
                return
            }

            if (newPassword !== confirmPassword) {
                toast.error(
                    'try again! new password and confirm password does not match',
                )
                return
            }

            const updatedUsers = users.map((u) => {
                if (u.email === user.email) {
                    u.password = newPassword
                }
                return u
            })
            const updatedEmployees = employees.map((el) => {
                if (el.email === user.email) {
                    el.password = newPassword
                }
                return el
            })

            const updatedUser = { ...user, password: newPassword }

            localStorage.setItem('loginUser', JSON.stringify(updatedUser))

            localStorage.setItem('users', JSON.stringify(updatedUsers))

            localStorage.setItem(
                'employeesList',
                JSON.stringify(updatedEmployees),
            )

            toast.success('password has successfully changed.')
            form.clear()
            setChangePassword(false)
            console.log(updatedUsers)
        }

        return (
            <StyledModal
                open={changePassword}
                onClose={() => setChangePassword(false)}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
            >
                <Box width={400} bgcolor='white' p={3} borderRadius={4}>
                    <Box
                        sx={{
                            cursor: 'pointer',
                        }}
                        color='gray'
                        onClick={() => setChangePassword(false)}
                        display='flex'
                        justifyContent='right'
                    >
                        <CancelIcon />
                    </Box>
                    <form>
                        <TextField
                            size='small'
                            color='primary'
                            variant='outlined'
                            fullWidth
                            {...form.$('oldPassword').bind()}
                            margin='normal'
                        />

                        <TextField
                            size='small'
                            color='primary'
                            variant='outlined'
                            fullWidth
                            margin='normal'
                            {...form.$('newPassword').bind()}
                        />

                        <TextField
                            size='small'
                            color='primary'
                            variant='outlined'
                            fullWidth
                            margin='normal'
                            {...form.$('confirmPassword').bind()}
                        />

                        <Button
                            variant='contained'
                            color='secondary'
                            fullWidth
                            onClick={() => handleChangePassword()}
                        >
                            Submit
                        </Button>
                    </form>
                </Box>
            </StyledModal>
        )
    },
)

export default inject('employeeStore')(ChangePassword)
