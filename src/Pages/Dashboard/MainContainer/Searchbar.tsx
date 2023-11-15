import React, { useState } from 'react'
import { Box, TextField, Button } from '@mui/material'

const Searchbar = ({ onFilterChange }: any) => {
    const [query, setQuery] = useState('')

    return (
        <Box width='50%' display='flex'>
            <form style={{ width: '100%' }}>
                <Box display='flex' gap={2}>
                    <TextField
                        fullWidth
                        size='small'
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        variant='outlined'
                    />
                    <Button
                        variant='outlined'
                        onClick={(e) => {
                            e.preventDefault()
                            onFilterChange(query)
                        }}
                    >
                        Submit
                    </Button>
                </Box>
            </form>
        </Box>
    )
}

export default Searchbar
