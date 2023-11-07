import { TextField, Typography, Box, Button } from "@mui/material"
import getMobxReactFormValidation from "../../../Shared/MobxValidation/MobxReactFormValidation"
import { useMemo, useState, useEffect } from "react"
import { registrationFields } from "../Fields/registration.fields"
import { inject, observer } from "mobx-react"
import { IUser } from "../../../Shared/Interfaces/registration.interface"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { toJS } from "mobx"
interface Props {
  employeeStore?: any
  isAdmin: boolean
}

const RegistrationForm = observer(({ employeeStore, isAdmin }: Props) => {
  // console.log(toJS(employeeStore))
  const [users, setUsers] = useState<IUser[]>([])
  const navigate = useNavigate()
  const form = useMemo(() => getMobxReactFormValidation(registrationFields), [])

  useEffect(() => {
    const storedData = localStorage.getItem("users")
    if (storedData) {
      setUsers(JSON.parse(storedData))
    }
    const login_user = JSON.parse(localStorage.getItem("login_user") || "null")

    if (login_user) {
      if (login_user.admin) {
        navigate("/dashboard")
      } else {
        navigate("/employee")
      }
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const { email } = form.values()

    const storedUsers = JSON.parse(localStorage.getItem("users") || "null")

    const login_user = storedUsers?.filter((el: IUser, i: number) => {
      return el.email === email
    })

    console.log(login_user)

    if (login_user?.length && login_user[0]?.email) {
      toast.error("user already exist..")
      return null
    }

    form.submit({
      onSuccess: () => {
        let user: IUser = { ...form.values(), admin: isAdmin }
        console.log(user)
        setUsers((prevState) => [...prevState, { ...user }])

        localStorage.setItem("users", JSON.stringify([...users, { ...user }]))

        localStorage.setItem("login_user", JSON.stringify(user))
        form.clear()

        if (isAdmin) {
          navigate("/dashboard")
        } else {
          navigate("/employee")
        }
      },
      onError: (error: string) => toast.error(error),
    })
  }

  //   console.log(users)

  return (
    <Box>
      <form action="">
        <Box display="flex" mb={2}>
          <Typography variant="h6" mr={2} color="initial">
            Name:
          </Typography>
          <TextField
            size="small"
            fullWidth
            variant="outlined"
            {...form.$("name").bind()}
          />
        </Box>
        <Box display="flex" mb={2}>
          <Typography variant="h6" mr={2} color="initial">
            Email:
          </Typography>
          <TextField
            size="small"
            fullWidth
            {...form.$("email").bind()}
            variant="outlined"
          />
        </Box>
        <Box display="flex" mb={2}>
          <Typography variant="h6" mr={2} color="initial">
            Password:
          </Typography>
          <TextField
            size="small"
            fullWidth
            variant="outlined"
            {...form.$("password").bind()}
          />
        </Box>
        <Typography my={1}>
          Already have an Account ?
          <Link to="/login">
            <Button color="error">Login</Button>
          </Link>
        </Typography>
        <Button
          type="submit"
          size="small"
          fullWidth
          variant="contained"
          color="secondary"
          onClick={(e) => handleSubmit(e)}
        >
          {isAdmin ? " Register / Admin" : " Register / Employee"}
        </Button>
      </form>
    </Box>
  )
})

export default inject("employeeStore")(RegistrationForm)
