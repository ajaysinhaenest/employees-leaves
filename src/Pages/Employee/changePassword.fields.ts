export {}

export const changePasswordFields = [
    {
        name: 'oldPassword',
        label: 'old Password',
        type: 'password',
        rules: 'required|string',
    },
    {
        name: 'newPassword',
        label: 'new Password',
        type: 'password',
        rules: 'required|string',
    },
    {
        name: 'confirmPassword',
        label: 'confirm Password',
        type: 'password',
        rules: 'required|string',
    },
]
