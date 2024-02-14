import { Card, CardMedia, Typography } from '@mui/material'
import React from 'react'

const BookCard = ({ label = "", details = "", onClickCb }) => {
    return (
        <Card onClick={onClickCb} sx={{ cursor: "pointer" }} title={label}>
            <CardMedia
                sx={{ height: 140, width: 140 }}
                image="https://images.pexels.com/photos/4069088/pexels-photo-4069088.jpeg"
            />
            <Typography variant="h6" component="div">
                {label}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {details}
            </Typography>
        </Card>
    )
}

export default BookCard