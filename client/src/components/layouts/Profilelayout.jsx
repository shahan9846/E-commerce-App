import React from 'react'
import Profile from '../../pages/user/profile/Profile'
import { Outlet } from 'react-router-dom'

const Profilelayout = () => {
    return (
        <>
            <Profile />
            <Outlet/>
        </>
    )
}

export default Profilelayout