import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Modal } from '@mui/material';
import useFetch from '../../../libs/customhooks/UseFetch';

function AddBook({ onClose, bookDetails, fetchBooks }) {
    const [bookValues, setBookValues] = useState({
        bookTitle: "",
        authorName: ""
    })
    const fetch = useFetch()

    const handleSubmit = async (event) => {
        event.preventDefault();
        const book = {
            title: bookValues.bookTitle,
            author: bookValues.authorName
        }

        const { loading, data, error } = await fetch({ url: "/books", type: "POST", data: book })

        if(data){
            fetchBooks()
            onClose()
        }

    };

    const onChangeBookSectionInputFields = (e) => {
        const { name, value } = e.target
        setBookValues(prev => {
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
                            label="Book Title"
                            variant="outlined"
                            fullWidth
                            sx={{ my: 2 }}
                            required
                            name='bookTitle'
                            value={bookValues.bookTitle}
                            onChange={onChangeBookSectionInputFields}
                        />
                        <TextField
                            label="Author Name"
                            variant="outlined"
                            fullWidth
                            sx={{ my: 2 }}
                            required
                            name='authorName'
                            value={bookValues.authorName}
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

export default AddBook;
