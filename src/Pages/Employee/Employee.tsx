import { useState, useEffect } from 'react'
import { Box, Container, Typography, Button } from '@mui/material'
import { IUser } from '../../Shared/Interfaces/user.interface'
import ChangePassword from './ChangePassword'
import ApplyForLeave from './ApplyForLeave'

const Employee = () => {
    const [user, setUser] = useState<IUser>({
        firstName: '',
        lastName: '',
        email: '',
        admin: false,
        leaves: 0,
        availableLeaves: 0,
        password: '',
        block: false,
        blockCount: 0,
        appliedLeaves: [],
        disapproveLeavesComments: [],
    })
    const [changePassword, setChangePassword] = useState(false)
    const [isApply, setIsApply] = useState(false)

    useEffect(() => {
        const loginUser: IUser =
            JSON.parse(localStorage.getItem('loginUser') || '') || user

        setUser(loginUser)
    }, [changePassword, isApply])

    console.log(user)
    return (
        <Container>
            <Box
                borderRadius={1}
                mx='auto'
                my={20}
                width={400}
                p={3}
                bgcolor='white'
            >
                <Typography
                    textAlign='center'
                    mb={2}
                    variant='h5'
                    color='initial'
                >
                    Employee Profile
                </Typography>
                <Box>
                    <Typography>
                        Name: {user.firstName + ' ' + user.lastName}
                    </Typography>
                    <Typography>Email: {user.email}</Typography>
                    <Typography>
                        {!user.availableLeaves ? (
                            <Typography color='error'>
                                You can not take more leaves.
                            </Typography>
                        ) : (
                            ' available leaves:' + user.availableLeaves
                        )}
                    </Typography>
                </Box>
                <Box textAlign='center' mt={5}>
                    <Button
                        variant='contained'
                        color='secondary'
                        size='small'
                        fullWidth
                        onClick={() => setChangePassword(!changePassword)}
                    >
                        Change Password
                    </Button>
                </Box>

                <Box textAlign='center' mt={5}>
                    <Button
                        variant='contained'
                        color='success'
                        size='small'
                        fullWidth
                        onClick={() => setIsApply(!isApply)}
                    >
                        Leaves Details
                    </Button>
                </Box>

                <Box>
                    <ChangePassword
                        user={user}
                        changePassword={changePassword}
                        setChangePassword={setChangePassword}
                    />
                </Box>
                <Box>
                    <ApplyForLeave
                        user={user}
                        setUser={setUser}
                        isApply={isApply}
                        setIsApply={setIsApply}
                    />
                </Box>
            </Box>
        </Container>
    )
}

export default Employee
