import { Paper } from '@mui/material'
import React from 'react'

const MainContainerCard = ({ children }) => {
    return (
        <Paper elevation={1} sx={{ padding: "10px", margin: "10px", height: "calc(100vh - 100px)", width: "calc(100vw - 50px)", overflow: "auto" }} >
            {children}
        </Paper>
    )
}

export default MainContainerCard