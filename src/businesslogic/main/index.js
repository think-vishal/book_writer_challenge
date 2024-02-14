import React from 'react'
import Navbar from '../Navbar'
import { Route, Routes, useNavigate } from 'react-router-dom'
import BooksSection from '../bookssection'
import BookDetails from '../bookssection/BookDetails'
import MainContainerCard from '../../components/Card/MainContainerCard'
import AllowedUsers from '../auth/AllowedUsers'
import useUserType from '../../libs/customhooks/useUserType'
import Dashboard from '../dashboardsection'

const Main = () => {
    const navigate = useNavigate()
    const userType = useUserType()

    const NAV_ITEMS = [
        ...(userType === "1" ? [{ label: "Dashboard", path: "/", onClickCb: (path) => { navigate(path) } }] : []),
        { label: "Books", path: "books", onClickCb: (path) => { navigate(path) } },
    ]

    const MAIN_ROUTES = [
        { path: "/", component: <AllowedUsers allowedUsersTypes={[1]}><Dashboard /></AllowedUsers> },
        { path: "/books", component: <BooksSection /> },
        { path: "/books/:id", component: <BookDetails /> },
    ]

    return (
        <div>
            <Navbar options={NAV_ITEMS} />
            <MainContainerCard >
                <Routes>
                    {MAIN_ROUTES.map((route, index) => {
                        return <Route key={"main-route-" + index} path={route.path} element={route.component} />
                    })}
                </Routes>
            </MainContainerCard>
        </div>
    )
}

export default Main