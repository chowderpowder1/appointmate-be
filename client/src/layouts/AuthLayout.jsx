import React from 'react'
import NoAccess from '../utils/NoAccess'
import { Outlet, Navigate} from 'react-router'

import {useUsers} from '../queries/users'
const AuthLayout = ({requiredRole}) => {
    const {data: userData, isLoading: userDataIsLoading, error: userDataError} = useUsers();
    if(userDataIsLoading) return <div>Loading...</div>
    if (userDataError) return <div>{userDataError.message}</div>
    console.log(userData)
    if(userData.role != requiredRole ){
        console.log('Not authorized')
        return (<NoAccess  title="Access Denied" message="You're not authorized to view this page"/>)
    }

    return <Outlet/>
}

export default AuthLayout
