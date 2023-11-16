import { localStorageKeyEnum } from '../Enums/localStorageKey.enum'
import { IEmployee } from '../Interfaces/employee.interface'
import { IUser } from '../Interfaces/user.interface'

class LocalStorageService {
    checkEmployeesList() {
        return localStorage.getItem(localStorageKeyEnum.EMPLOYEES_LIST)
    }
    checkUsersList() {
        return localStorage.getItem(localStorageKeyEnum.USERS_LIST)
    }
    checkLoginUser() {
        return localStorage.getItem(localStorageKeyEnum.LOGIN_USER)
    }

    setEmployeesList(employeesListData: IEmployee[]) {
        localStorage.setItem(
            localStorageKeyEnum.EMPLOYEES_LIST,
            JSON.stringify(employeesListData),
        )
    }
    setUsersList(usersListData: IUser[]) {
        localStorage.setItem(
            localStorageKeyEnum.USERS_LIST,
            JSON.stringify(usersListData),
        )
    }
    setLoginUser(user: IUser) {
        localStorage.setItem(
            localStorageKeyEnum.LOGIN_USER,
            JSON.stringify(user),
        )
    }

    getEmployeesList() {
        try {
            return (
                JSON.parse(
                    localStorage.getItem(localStorageKeyEnum.EMPLOYEES_LIST) ||
                        '',
                ) || []
            )
        } catch (error) {
            console.error('Error parsing JSON:', error)
        }
    }

    getUsersList() {
        try {
            return (
                JSON.parse(
                    localStorage.getItem(localStorageKeyEnum.USERS_LIST) || '',
                ) || []
            )
        } catch (error) {
            console.error('Error parsing JSON:', error)
        }
    }

    getLoginUser() {
        try {
            const loginUser: IUser = JSON.parse(
                localStorage.getItem(localStorageKeyEnum.LOGIN_USER) || '',
            )
            return loginUser
        } catch (error) {
            console.error('Error parsing JSON:', error)
        }
    }
}

export default new LocalStorageService()
