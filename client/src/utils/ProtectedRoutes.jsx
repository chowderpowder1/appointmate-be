import React from 'react'
import { Outlet, Navigate} from 'react-router'

import {useUsers} from '../queries/users'
const ProtectedRoutes = () => {
        const {data: userData, isLoading: userDataIsLoading, error: userDataError} = useUsers();

        if(userDataIsLoading) return <div>Loading...</div>
        if (userDataError) return <div>{userDataError.message}</div>
        console.log(userData)       
        const user = null
        return userData.loggedIn ? <Outlet/> : <Navigate to='/login'/>
}

export default ProtectedRoutes
