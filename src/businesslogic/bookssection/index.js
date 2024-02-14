import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BookCard from '../../components/Card/Card'
import { Button, Typography } from '@mui/material'
import AddBook from './AddBook'
import General from '../../libs/General'
import AllowAccess from '../auth/AllowAccess'
import useFetch from '../../libs/customhooks/UseFetch'

const BooksSection = () => {
    const [books, setBooks] = useState([])
    const [isBookFetching, setIsBookFetching] = useState(false)
    const [openAddBookModal, setOpenAddBookModal] = useState(false)
    const navigate = useNavigate()
    const fetch = useFetch()

    useEffect(() => {
        fetchBooks()
    }, [])

    const fetchBooks = async () => {
        setIsBookFetching(true)
        try {
            const { loading, data, error } = await fetch({ url: "/books" })
            setBooks(data)
        } catch (err) {
            console.error(err?.message || "something went wrong")
        } finally {
            setIsBookFetching(false)
        }
    }

    if (isBookFetching) {
        return (<Typography component={"div"} width={"100%"} textAlign={"center"}>Loading...</Typography>)
    }

    return (
        <>
            <AllowAccess allowedUsersTypes={[1]} >
                <Typography component={"div"} sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button onClick={() => setOpenAddBookModal(true)} variant="contained" sx={{ maxWidth: "200px", margin: "10px" }}>Add Book</Button>
                </Typography>
                <hr />
            </AllowAccess>
            <Typography component={"div"} sx={{ display: "flex", flexWrap: "wrap", columnGap: "10px", rowGap: "10px" }}>
                {books.length ? books.map((book, index) => {
                    return <BookCard title={book.label} key={"book-list-" + index} onClickCb={() => { navigate((book.id).toString()) }} label={General.getElipsisString(book.title, 10)} />
                }) : <Typography sx={{ widt: "30%", margin: 'auto' }}>No books available please add one</Typography>}
            </Typography>
            {openAddBookModal ? <AddBook fetchBooks={fetchBooks} onClose={() => setOpenAddBookModal(false)} /> : null}
        </>
    )
}

export default BooksSection