import React from 'react'
import useUserType from '../../libs/customhooks/useUserType'

const AllowAccess = ({ children, allowedUsersTypes }) => {
    const userType = useUserType()

    if (allowedUsersTypes.includes(Number(userType))) {
        return <>{children}</>
    }
    return (
        null
    )
}

export default AllowAccess