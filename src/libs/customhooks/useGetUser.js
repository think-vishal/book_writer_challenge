import { useEffect, useState } from "react"
import General from "../General"

function useGetUser() {
    const [user, setUser] = useState()

    useEffect(() => {
        const user = General.getLocalStorage('user')
        setUser(user)
    }, [])

    return user
}

export default useGetUser