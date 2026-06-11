import React from 'react'
import Sidebar from '../../components/admin/Sidebar'
import { Outlet } from 'react-router-dom'


const Dashlayout = () => {
    return (
        <>
        <div className="dashboard">
            <Sidebar />
            <Outlet />
        </div>
        </>
    )
}

export default Dashlayout