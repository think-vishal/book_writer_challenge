import { useEffect, useState } from "react"
import General from "../General"

function useUserType() {
    const [userType, setUserType] = useState()

    useEffect(() => {
        const user = General.getLocalStorage('user')
        setUserType(user.userType)
    }, [])

    return userType
}

export default useUserType