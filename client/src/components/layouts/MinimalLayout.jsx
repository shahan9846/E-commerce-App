import React from 'react'
import Navbar from '../../components/user/Navbar'
import { Outlet } from 'react-router-dom'

const MinimalLayout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
        </>

    )
}

export default MinimalLayout