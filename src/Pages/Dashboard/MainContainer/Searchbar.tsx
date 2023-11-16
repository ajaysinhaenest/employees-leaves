import React, { useState } from 'react'
import { Box, TextField, Button } from '@mui/material'

const Searchbar = ({ onFilterChange }: any) => {
    const [searchQuery, setSearchQuery] = useState('')

    return (
        <Box width='50%' display='flex'>
            <form style={{ width: '100%' }}>
                <Box display='flex' gap={2}>
                    <TextField
                        fullWidth
                        size='small'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        variant='outlined'
                    />
                    <Button
                        variant='outlined'
                        type='submit'
                        onClick={(e) => {
                            e.preventDefault()
                            onFilterChange(searchQuery)
                        }}
                    >
                        Search
                    </Button>
                </Box>
            </form>
        </Box>
    )
}

export default Searchbar
