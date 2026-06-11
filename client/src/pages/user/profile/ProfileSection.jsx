import React from 'react'
import Navbar from '../../../components/user/Navbar'
import { Outlet } from 'react-router-dom'
import { NavLink, Link } from 'react-router-dom'
import rightArrow from '../../../assets/images/rightArrow.png'


const ProfileSection = () => {
    return (
        <>
            <div className="profile-section">
                <div className="profile-section-heading">

                    <h1>Profile</h1>
                    <h6 className="cart-nav_links"><Link to='/'>Home</Link> <img src={rightArrow} alt="" /> Profile</h6>
                </div>
                <div className="profile-section-nav-btns">

                    <NavLink to='/profile' className={({ isActive }) => `profile-section-btn ${isActive ? 'active' : ''}`} >Profile</NavLink>
                    <NavLink to='/address' className='profile-section-btn'>Address</NavLink>
                    <NavLink to='/order' className='profile-section-btn'>Order</NavLink>
                </div>
                <Outlet />
            </div>
        </>
    )

}

export default ProfileSection