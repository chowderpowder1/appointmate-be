import {React, createContext, useContext} from 'react'
import {Outlet} from 'react-router'
import TherapistTopNav from '../components/Therapist/TherapistNavBar'
import FrontDeskSideNav from '../components/FrontDesk/FdSideBar'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Tanstack
import { useUsers } from '../queries/users'
import {useGetAvatar} from '../queries/users'

export const UserContext = createContext(null);

export const useUser = () => useContext(UserContext)

const FrontDeskLayout = () => {

  const { data: userData, isLoading: userDataIsLoading, error: userDataError} = useUsers();

  const { data: avatar, isLoading: avatarIsLoading, error: avatarError} = useGetAvatar(userData?.userId);
  
  if (avatarIsLoading || userDataIsLoading) return <div>Loading...</div>;
  if (avatarError || userDataError) return <div>⚠ Error: {avatarError.message}</div>;

  return (
    <div style={{display:'flex', backgroundColor:'#F5F5F5'}}>
        <FrontDeskSideNav/>
        <UserContext.Provider value={avatar}>
          <div style={{width:'100%'}}>
              <TherapistTopNav/>
            <Outlet/>
          </div>
          </UserContext.Provider>
              <ToastContainer
                position="top-right"
                newestOnTop
                closeOnClick
                pauseOnHover
              />
          
    </div>
  )
}


export default FrontDeskLayout
