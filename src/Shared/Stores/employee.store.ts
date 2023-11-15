import { action, makeObservable, observable } from 'mobx'
import { IEmployee } from '../Interfaces/employee.interface'

export class EmployeeStore {
    employeesList: IEmployee[] = []
    // rootStore
    constructor(rootStore: any) {
        makeObservable(this, {
            employeesList: observable,
            setEmployeesList: action,
        })
        // this.rootStore = rootStore
    }

    setEmployeesList = (data: IEmployee[]) => {
        this.employeesList = data
    }

    updateEmployByEmail = (): IEmployee[] => {
        try {
            const abc = this.getEmployesList()
            return abc
        } catch (error) {
            return []
        }
    }

    getEmployesList = (): IEmployee[] => {
        try {
            return JSON.parse(localStorage.getItem('employeesList') || '') || []
        } catch (error) {
            return []
        }
    }
}
