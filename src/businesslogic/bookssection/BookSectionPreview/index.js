import { Container, Modal, Typography } from '@mui/material'
import React from 'react'

const BookSectionPreview = ({ data, onClose }) => {
    return (
        <Container>
            <Modal open={true} onClose={onClose}>
                <Container maxWidth="sm" sx={{ mt: 8, p: 4, bgcolor: 'background.paper', borderRadius: 4 }}>
                    <Typography variant="h5" gutterBottom>
                        {data?.title || ""}
                    </Typography>
                    <Typography>
                        {data.description || ""}
                    </Typography>
                </Container>
            </Modal>
        </Container>
    )
}

export default BookSectionPreview