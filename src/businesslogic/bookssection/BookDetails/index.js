import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BookSectionForm from '../BookSectionForm'
import BookSectionPreview from '../BookSectionPreview'
import useUserType from '../../../libs/customhooks/useUserType'
import useGetUser from '../../../libs/customhooks/useGetUser'
import useFetch from '../../../libs/customhooks/UseFetch'

const renderBookSection = (section, addBtnCb = () => { }, editBtnCb = () => { }, previewCb = () => { }, userType = "", user) => {
    return <React.Fragment key={'section.id'}>
        <li>
            <span onClick={() => previewCb({ description: section.description, title: section.title })}>{section.title}</span>
            {user?.editPermission ? <Button size='small' title='Add a section' variant="text" onClick={() => { editBtnCb(section) }}>edit</Button> : null}
            {userType === "1" ? <Button size='small' title='Add a section' variant="text" onClick={() => { addBtnCb(section) }}>Add section</Button> : null}
        </li>
        <ul>
            {section?.sections?.length ?
                section?.sections.map((section, index) => {
                    return <React.Fragment key={`${section.title}-book-section-" + ${index}`}>
                        {renderBookSection(section, addBtnCb, editBtnCb, previewCb, userType, user)}
                    </React.Fragment>
                })
                : null}
        </ul>
    </React.Fragment >
}

const BookDetails = () => {
    const { id } = useParams()
    const [isFetchingBookDetails, setIsFetchingBookDetails] = useState(false)
    const [book, setBook] = useState({})
    const [openAddEditSectionModal, setOpenAddEditSectoinModal] = useState({ isOpen: false, isEditClick: false })
    const [previewSection, setPreviewSection] = useState({
        isOpen: false,
        previewData: ""
    })
    const userType = useUserType()
    const user = useGetUser()

    const fetch = useFetch()

    const onClickPreviewSection = (previewData) => {
        setPreviewSection({
            isOpen: true,
            previewData
        })
    }

    const onClosePreviewSection = () => {
        setPreviewSection({
            isOpen: false,
            previewData: {}
        })
    }

    const handleAddSectionClick = (parentSection) => {
        setOpenAddEditSectoinModal({
            isOpen: true,
            parentSection
        })
    }

    const handleEditSectionClick = (parentSection) => {
        setOpenAddEditSectoinModal({
            isOpen: true,
            parentSection,
            isEditClick: true
        })
    }

    const closeBookSectionFormCb = () => [
        setOpenAddEditSectoinModal({ isOpen: false, isEditClick: false, parentSection: {} })
    ]

    const updateSection = async (newSection, isEditClick) => {
        const { parentSection } = openAddEditSectionModal
        if (isEditClick) {
            parentSection.title = newSection.name
            parentSection.description = newSection.text
        } else {
            const addSection = { id: parentSection.id + `.${parentSection?.sections?.length ? parentSection?.sections?.length + 1 : "1"}`, title: newSection.name, description: newSection.text }

            if (parentSection.hasOwnProperty("sections")) {
                parentSection.sections = [...parentSection.sections, addSection]
            } else {
                parentSection.sections = [addSection]
            }
        }

        const newBook = { ...book }

        const response = await fetch({ url: `/books/${book.id}`, type: 'PUT', data: newBook })
        if (response) {
            fetchBookById(book.id)
            closeBookSectionFormCb()
        }
    }

    const fetchBookById = async (id) => {
        setIsFetchingBookDetails(true)
        try {
            const {loading, data, error} = await fetch({ url: `/books/${id}`})
            setBook(data)
        } catch (err) {
            console.error(err?.message || "something went wrong")
        } finally {
            setIsFetchingBookDetails(false)
        }
    }
    useEffect(() => {
        fetchBookById(id)
    }, [id])

    if (isFetchingBookDetails) {
        return <div>Loading Book Details...</div>
    }

    return (
        <>
            <ul>
                {renderBookSection(book, handleAddSectionClick, handleEditSectionClick, onClickPreviewSection, userType, user)}
            </ul>

            {openAddEditSectionModal?.isOpen ? <BookSectionForm sectionDetails={openAddEditSectionModal} onClickSaveSectionCb={updateSection} onClose={closeBookSectionFormCb} /> : null}
            {previewSection.isOpen ? <BookSectionPreview data={previewSection.previewData} onClose={onClosePreviewSection} /> : null}
        </>
    )
}

export default BookDetails