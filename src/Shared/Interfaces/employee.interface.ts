interface appliedLeaves {
    name: string
    email: string
    subject: string
    date: string
    status: string
}

interface disapproveLeavesComments extends appliedLeaves {
    comment: string
}

export interface IEmployee {
    firstName: string
    lastName: string
    email: string
    password: string
    leaves: number
    availableLeaves: number
    admin: boolean
    blockCount: number
    block: boolean
    appliedLeaves: appliedLeaves[]
    disapproveLeavesComments: disapproveLeavesComments[]
}
