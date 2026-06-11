import React, { useContext, useEffect } from 'react'
import searchIcon from '../../assets/icons/search.svg'
import notificationIcon from '../../assets/icons/notification.svg'
import userIcon from '../../assets/icons/user.svg'
import { useState } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import perfume from '../../assets/images/perfume.png'
import { FaSearch, FaSearchDollar, FaSearchLocation, FaSearchengin } from 'react-icons/fa'
import { ProductsContext } from '../../contexts/ProductsContext'
import { WishlistContext } from '../../contexts/WishlistContext'
import { CartContext } from '../../contexts/CartContext'
import { AuthContext } from '../../contexts/AuthContext'


const Navbar = () => {

    const { onHandleInput, input, onSelectProduct, searchProducts } = useContext(ProductsContext)
    const { wishlist } = useContext(WishlistContext)
    const { cart } = useContext(CartContext)
    const { user } = useContext(AuthContext)
    // useEffect(() => {
    //     console.log(user)
    // }, [user])


    const [active, setActive] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const navigate = useNavigate();
    const toggleProfile = () => setProfileOpen(!profileOpen);
    const handleLogout = () => {
        if (!window.confirm('Are you sure you want to logout')) return
        localStorage.removeItem('token');
        navigate('/login');
        setProfileOpen(false);
    };

    return (

        <header>
            <nav>
                <div className="navbar">
                    <NavLink to='/' className='navbar-title'>Fragranzia</NavLink>

                    <div className={`hamburger-menu ${active ? 'active' : ''}`} onClick={() => setActive(!active)}>
                        <span className='line line-1'></span>
                        <span className='line line-2'></span>
                        <span className='line line-3'></span>
                    </div>

                    <div className="navbar-right-side">
                        <div className="navbar-links">
                            <NavLink to='/' className={({ isActive }) => `navbar-links ${isActive ? "active" : ""}`} onClick={() => setProfileOpen(false)}>Home</NavLink>
                            <NavLink to='/all-products' onClick={() => setProfileOpen(false)}>Products</NavLink>
                            {/* <a href="">Gifting</a> */}
                            <NavLink to='/about' onClick={() => setProfileOpen(false)}>About</NavLink>
                        </div>
                        <div className="navbar-icons">
                            <div className="nav-search-box">
                                <div className="search-wrapper">
                                    <label htmlFor="search-field"><img src={searchIcon} className='search-icon' onClick={onSelectProduct} /></label>
                                    <input type="text" name="" id="search-field" placeholder='Search Here' onChange={onHandleInput} value={input} />
                                </div>
                                <div className="search-products-lists">
                                    {input.length > 0 &&
                                        <>
                                            {searchProducts.map((product) => (
                                                <Link key={product._id} to={`/product/${product._id}`} onClick={onSelectProduct}>
                                                    <div className="search-products-list">
                                                        <img src={`http://localhost:5000/uploads/${product.image}`} alt={product.name} className='search-product-img' />
                                                        <p className='search-product-title'>{product.name ? (product.name.slice(0, 50) + '...') : ''}</p>
                                                    </div>
                                                    <hr />
                                                </Link>
                                            ))}
                                        </>
                                    }
                                    {/* <div className="search-products-list">
                                        <img src={perfume} alt="" className='search-product-img' />
                                        <p>mans shirts</p>
                                    </div>
                                    <hr /> */}
                                </div>

                            </div>
                            <div className="nav-icons">
                                <NavLink to='/cart' className={({ isActive }) => `nav-icons ${isActive ? 'active' : ''}`} onClick={() => setProfileOpen(false)}><svg className='cart-icon' width="27" height="27" viewBox="0 0 27 27" fill="none" stroke='none' xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.856 2.66683L5.34667 18.8482C5.39093 19.1709 5.5518 19.4662 5.79892 19.6785C6.04603 19.8907 6.36229 20.0051 6.688 20.0002H21.3333C21.6202 20.0002 21.8994 19.9077 22.1295 19.7364C22.3596 19.5652 22.5283 19.3243 22.6107 19.0495L26.6107 5.71617C26.6703 5.51709 26.6826 5.30682 26.6465 5.10215C26.6105 4.89748 26.5271 4.70407 26.403 4.53736C26.2789 4.37065 26.1175 4.23526 25.9318 4.14199C25.7461 4.04872 25.5412 4.00015 25.3333 4.00017H5.76L5.32 1.1495C5.2747 0.823438 5.11037 0.525661 4.85867 0.3135C4.61271 0.106358 4.30019 -0.0049204 3.97867 0.000167029H1.33333C0.979711 0.000167029 0.640573 0.140643 0.390524 0.390691C0.140476 0.64074 0 0.979878 0 1.3335C0 1.68712 0.140476 2.02626 0.390524 2.27631C0.640573 2.52636 0.979711 2.66683 1.33333 2.66683H2.856ZM7.81067 17.3335L6.17067 6.66683H23.5413L20.3413 17.3335H7.81067ZM10.6667 24.0002C10.6667 24.7074 10.3857 25.3857 9.88562 25.8858C9.38552 26.3859 8.70724 26.6668 8 26.6668C7.29276 26.6668 6.61448 26.3859 6.11438 25.8858C5.61428 25.3857 5.33333 24.7074 5.33333 24.0002C5.33333 23.2929 5.61428 22.6146 6.11438 22.1145C6.61448 21.6145 7.29276 21.3335 8 21.3335C8.70724 21.3335 9.38552 21.6145 9.88562 22.1145C10.3857 22.6146 10.6667 23.2929 10.6667 24.0002ZM22.6667 24.0002C22.6667 24.7074 22.3857 25.3857 21.8856 25.8858C21.3855 26.3859 20.7072 26.6668 20 26.6668C19.2928 26.6668 18.6145 26.3859 18.1144 25.8858C17.6143 25.3857 17.3333 24.7074 17.3333 24.0002C17.3333 23.2929 17.6143 22.6146 18.1144 22.1145C18.6145 21.6145 19.2928 21.3335 20 21.3335C20.7072 21.3335 21.3855 21.6145 21.8856 22.1145C22.3857 22.6146 22.6667 23.2929 22.6667 24.0002Z" fill="black" />
                                </svg>
                                </NavLink>
                                {cart.length > 0 &&
                                    <div className='nav-count'>{cart.length}</div>
                                }
                            </div>
                            <div className="nav-icons">
                                <NavLink to='/wishlist' className={({ isActive }) => `nav-icons ${isActive ? 'active' : ''}`} onClick={() => setProfileOpen(false)}><svg className='wishlist-icon' width="30" height="40" viewBox="0 0 32 22" fill="none" stroke='none' xmlns="http://www.w3.org/2000/svg">
                                    <path d="M28.9172 3.54347C28.1842 2.81009 27.3138 2.22831 26.3559 1.83139C25.3979 1.43446 24.3712 1.23016 23.3343 1.23016C22.2974 1.23016 21.2706 1.43446 20.3127 1.83139C19.3548 2.22831 18.4844 2.81009 17.7514 3.54347L16.2301 5.06479L14.7088 3.54347C13.2281 2.06278 11.2199 1.23093 9.12588 1.23093C7.03189 1.23093 5.02366 2.06278 3.54298 3.54347C2.0623 5.02417 1.23047 7.03242 1.23047 9.12644C1.23047 11.2205 2.0623 13.2287 3.54298 14.7094L5.06429 16.2307L16.2301 27.3967L27.3959 16.2307L28.9172 14.7094C29.6506 13.9764 30.2323 13.106 30.6293 12.1481C31.0262 11.1901 31.2305 10.1634 31.2305 9.12644C31.2305 8.08952 31.0262 7.06276 30.6293 6.10481C30.2323 5.14687 29.6506 4.27651 28.9172 3.54347Z" stroke="#00354B" strokeWidth="2.46035" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                </NavLink>
                                {wishlist.length > 0 &&
                                    <div className='nav-count'>{wishlist.length}</div>
                                }
                            </div>
                            {/* <div className="nav-icons">
                                <svg className='icon' width="25" height="27" viewBox="0 0 25 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4.90341 7.96087C5.10537 6.13876 5.97225 4.45515 7.3381 3.23233C8.70395 2.0095 10.4728 1.33337 12.3061 1.33337C14.1393 1.33337 15.9082 2.0095 17.2741 3.23233C18.6399 4.45515 19.5068 6.13876 19.7087 7.96087L20.0447 10.9822L20.0527 11.0582C20.2249 12.5569 20.713 14.002 21.4847 15.2982L21.5247 15.3649L22.2941 16.6489C22.9941 17.8142 23.3434 18.3969 23.2674 18.8755C23.2172 19.1933 23.0538 19.4821 22.8074 19.6889C22.4354 20.0009 21.7554 20.0009 20.3967 20.0009H4.21541C2.85541 20.0009 2.17541 20.0009 1.80474 19.6902C1.55755 19.4833 1.39366 19.1939 1.34341 18.8755C1.26874 18.3969 1.61808 17.8142 2.31674 16.6489L3.08874 15.3635L3.12874 15.2969C3.89988 14.001 4.3875 12.5563 4.55941 11.0582L4.56741 10.9822L4.90341 7.96087Z" stroke="black" stroke-width="2.66667" />
                                    <path d="M6.97266 20.0009C6.97266 21.4153 7.53456 22.7719 8.53475 23.7721C9.53495 24.7723 10.8915 25.3342 12.306 25.3342C13.7205 25.3342 15.077 24.7723 16.0772 23.7721C17.0774 22.7719 17.6393 21.4153 17.6393 20.0009" stroke="black" stroke-width="2.66667" stroke-linecap="round" />
                                </svg>

                            </div> */}
                            <div className="nav-icons">
                                <NavLink to='/profile' className={({ isActive }) => `nav-icons ${isActive ? 'active' : ''}`}
                                    onClick={toggleProfile}
                                >
                                    <svg className='profile-icon' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1.3335 20.0001C1.3335 18.5856 1.8954 17.229 2.89559 16.2288C3.89579 15.2287 5.25234 14.6667 6.66683 14.6667H17.3335C18.748 14.6667 20.1045 15.2287 21.1047 16.2288C22.1049 17.229 22.6668 18.5856 22.6668 20.0001C22.6668 20.7073 22.3859 21.3856 21.8858 21.8857C21.3857 22.3858 20.7074 22.6667 20.0002 22.6667H4.00016C3.29292 22.6667 2.61464 22.3858 2.11454 21.8857C1.61445 21.3856 1.3335 20.7073 1.3335 20.0001Z" stroke="black" strokeWidth="2.66667" strokeLinejoin="round" />
                                        <path d="M12 9.33337C14.2091 9.33337 16 7.54251 16 5.33337C16 3.12424 14.2091 1.33337 12 1.33337C9.79086 1.33337 8 3.12424 8 5.33337C8 7.54251 9.79086 9.33337 12 9.33337Z" stroke="black" strokeWidth="2.66667" />
                                    </svg>
                                </NavLink>
                                {/* Profile dropdown */}
                                {profileOpen && (
                                    <div className="profile-dropdown" style={{ position: 'absolute', top: '100%', right: 0, background: '#fff', border: '1px solid #ddd', borderRadius: '4px', boxShadow: '0 2px 8px rgba(0,0,0,0.15)', width: '100px' }}>
                                        <ul style={{ listStyle: 'none', margin: 0, }}>
                                            {/* <li onClick={() => { navigate('/profile'); setProfileOpen(false); }} style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>Profile</li> */}
                                            <li onClick={() => { navigate('/order'); setProfileOpen(false); }} style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>My Orders</li>
                                            <hr />
                                            <li onClick={handleLogout} style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>Logout</li>
                                        </ul>
                                    </div>
                                )}


                            </div>
                            {user === null &&
                                <div>
                                    <Link to='/signup' className='nav-auth '>Register</Link>
                                    <Link to='/login' className='nav-auth '>Login</Link>
                                </div>
                            }


                        </div>
                    </div>


                    <div className={`mobile_menu_slide ${active ? 'show' : ''}`}>
                        <div className="mobile_menu_slide-links">
                            <div className="mobile_menu_slide-link">
                                <Link to='/all-products' onClick={() => setActive(false)}>Products</Link>
                            </div>
                            <div className="mobile_menu_slide-link">
                                <Link to='about' onClick={() => setActive(false)}>About</Link>
                            </div>
                            <div className="mobile_menu_slide-link">
                                <Link to='/cart' onClick={() => setActive(false)}>Cart</Link>
                            </div>
                            <div className="mobile_menu_slide-link">
                                <Link to='/wishlist' onClick={() => setActive(false)}>Wishlist</Link>
                            </div>
                            <div className="mobile_menu_slide-link">
                                <Link to='/profile'>Profile</Link>
                            </div>
                            <div className="mobile_menu_slide-link">
                                <Link to='/signip'>Register</Link>
                            </div>
                            <div className="mobile_menu_slide-link">
                                <Link to='/login'>Login</Link>
                            </div>

                        </div>
                    </div>
                </div>

            </nav>

        </header >
    )
}

export default Navbar