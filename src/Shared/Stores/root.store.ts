import { EmployeeStore } from './employee.store'

class RootStore {
    employeeStore
    constructor() {
        this.employeeStore = new EmployeeStore(this)
    }
}

export default RootStore
