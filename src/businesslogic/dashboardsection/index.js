import React, { useEffect, useState } from 'react'
import PermissionTable from './permissionTable'
import useFetch from '../../libs/customhooks/UseFetch'
import useUserType from '../../libs/customhooks/useUserType'
import { Navigate } from 'react-router-dom';


const Dashboard = () => {
    const fetch = useFetch()
    const [users, setUsers] = useState([])
    const userType = useUserType()

    useEffect(() => {
        fetchUsers()
    }, [])

    useEffect(() => {
        if (userType && userType !== "1") {
            return <Navigate to={"/books"} />
        }
    }, [userType])


    const fetchUsers = async () => {
        const { loading, data, error } = await fetch({ url: "/users" })
        const collaboratorUsers = data.filter(user => user.userType !== "1")
        setUsers(collaboratorUsers)
    }
    const onPermissionChangeCb = async (e, row) => {
        const { loading, data, error } = await fetch({ url: `/users/${row.id}`, type: "PATCH", data: { editPermission: e.target.checked } })
        fetchUsers()
    }
    
    return (
        <div><PermissionTable data={users} onToggleChange={onPermissionChangeCb} /></div>
    )
}

export default Dashboard