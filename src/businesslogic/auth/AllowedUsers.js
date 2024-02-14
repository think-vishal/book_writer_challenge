import React from 'react'
import useUserType from '../../libs/customhooks/useUserType'
import { useNavigate } from 'react-router-dom'

const AllowedUsers = ({ children, allowedUsersTypes }) => {
    const userType = useUserType()
    const navigate = useNavigate()

    if (userType && allowedUsersTypes.includes(Number(userType))) {
        return <>{children}</>
    } else if (userType) {
        return navigate("/books")
    }
}

export default AllowedUsers