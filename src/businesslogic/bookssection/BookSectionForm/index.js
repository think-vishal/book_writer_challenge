import React, { useEffect, useState } from 'react';
import { TextField, Button, Typography, Container, Modal } from '@mui/material';

function BookSectionForm({ onClickSaveSectionCb, onClose, sectionDetails }) {
    const [bookSectionFormValues, setBookSectionFormValues] = useState({
        sectionName: "",
        sectionText: ""
    })

    useEffect(() => {
        if (!sectionDetails.isEditClick) return
        const { title, description } = sectionDetails?.parentSection || {}
        setBookSectionFormValues({ sectionName: title, sectionText: description })
    }, [sectionDetails])

    const handleSubmit = (event) => {
        event.preventDefault();
        onClickSaveSectionCb({ name: bookSectionFormValues.sectionName, text: bookSectionFormValues.sectionText }, sectionDetails.isEditClick);
    };

    const onChangeBookSectionInputFields = (e) => {
        const { name, value } = e.target
        setBookSectionFormValues(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    return (
        <Container>
            <Modal open={true} onClose={onClose}>
                <Container maxWidth="sm" sx={{ mt: 8, p: 4, bgcolor: 'background.paper', borderRadius: 4 }}>
                    <Typography variant="h5" gutterBottom>
                        Add Section
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Section Name"
                            variant="outlined"
                            fullWidth
                            sx={{ my: 2 }}
                            required
                            name='sectionName'
                            value={bookSectionFormValues.sectionName}
                            onChange={onChangeBookSectionInputFields}
                        />
                        <TextField
                            label="Section Content"
                            variant="outlined"
                            name='sectionText'
                            fullWidth
                            multiline
                            rows={6}
                            sx={{ my: 2 }}
                            value={bookSectionFormValues.sectionText}
                            onChange={onChangeBookSectionInputFields}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            sx={{ mt: 2 }}
                        >
                            Submit
                        </Button>
                    </form>
                </Container>
            </Modal>
        </Container>
    );
}

export default BookSectionForm;
