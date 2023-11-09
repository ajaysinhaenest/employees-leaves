export const randomDateFunction = () => {
    const start = new Date('1970-01-01')
    const end = new Date('2023-12-31')

    const date = new Date(
        start.getTime() + Math.random() * (end.getTime() - start.getTime()),
    )

    const options = {
        weekday: 'short' as const, // Valid values: 'short', 'long', 'narrow'
        month: 'short' as const, // Valid values: 'short', 'long', 'narrow'
        day: '2-digit' as const, // Valid values: '2-digit', 'numeric', 'undefined'
    }

    return date.toLocaleDateString('en-US', options)
}
