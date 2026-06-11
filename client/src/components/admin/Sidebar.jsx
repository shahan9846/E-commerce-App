import react from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Sidebar = () => {
    const navigate = useNavigate()
    const handleLogOut = () => {
        if (!window.confirm('Are you sure you want to log out?')) return
        localStorage.removeItem('token')
        navigate('/login')
    }
    return (
        <>

            <aside>
                <div className="dashboard-side_bar">
                    <h1>Fragranzia</h1>
                    <nav>
                        <div className="dashboard-side_bar_nav">
                            <Link to='/dashboard'>Dashboard</Link>
                            <Link to='/product-table'>Product</Link>
                            <Link to='/category'>Categories</Link>
                            {/* <Link >Offer</Link> */}
                            <Link to='/customers'>Customers</Link>
                            <Link to='/orders-table'>Orders</Link>
                            <a onClick={handleLogOut}>Log Out</a>
                        </div>
                    </nav>

                </div>
            </aside >
        </>

    )
}

export default Sidebar