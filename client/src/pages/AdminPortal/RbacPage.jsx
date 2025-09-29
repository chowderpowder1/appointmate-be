import {React, useState} from 'react'
import RbacStyles from './RbacPage.module.css'

import ManageRolesTab from '../../components/AdminPortal/ManageRolesTab'
import AddUserTab from '../../components/AdminPortal/AddUserTab'


const RbacPage = () => {

  return (
    <div className={RbacStyles.container}>
       <ManageRolesTab/>
       <AddUserTab/>
    </div>


    // </div>
  )
}

export default RbacPage
