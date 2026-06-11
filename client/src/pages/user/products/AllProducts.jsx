import filter from '../../../assets/images/filter.png'
import rightArrow from '../../../assets/images/rightArrow.png'
import { Link } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { ProductsContext } from '../../../contexts/ProductsContext'
import { CartContext } from '../../../contexts/CartContext'
import { WishlistContext } from '../../../contexts/WishlistContext'
import { ToastContainer } from 'react-toastify'
import { fetchCategory } from '../../../services/admin-api-service/categoryApi'
import { FaSearch } from 'react-icons/fa'

const AllProducts = () => {

    const { products } = useContext(ProductsContext)
    const { onCartAdd } = useContext(CartContext)
    const { wishlistAdd, wishlist } = useContext(WishlistContext)

    const [visibleCount, setVisibleCount] = useState(9)
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('')
    const [sortBy, setSortBy] = useState('relevance')
    const [searchInput, setSearchInput] = useState('')
    const [appliedSearch, setAppliedSearch] = useState('')
    const [showFilterDropdown, setShowFilterDropdown] = useState(false)

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const data = await fetchCategory()
                if (data) setCategories(data)
            } catch (error) {
                console.log('Error fetching categories:', error)
            }
        }
        loadCategories()
    }, [])

    // const handleSearchClick = () => {
    //     setAppliedSearch(searchInput)
    // }

    // const handleSearchKeyDown = (e) => {
    //     if (e.key === 'Enter') {
    //         setAppliedSearch(searchInput)
    //     }
    // }

    // Filter and Sort products dynamically
    const filteredProducts = products?.filter((product) => {
            const matchesCategory = selectedCategory
                ? (product.category && (product.category._id === selectedCategory || product.category.name === selectedCategory))
                : true
            const matchesSearch = appliedSearch
                ? (product.name && product.name.toLowerCase().includes(appliedSearch.toLowerCase()))
                : true
            return matchesCategory && matchesSearch
        })
        .sort((a, b) => {
            if (sortBy === 'priceLow') {
                return a.price - b.price
            } else if (sortBy === 'priceHigh') {
                return b.price - a.price
            } else if (sortBy === 'newest') {
                return b._id && a._id ? b._id.localeCompare(a._id) : 0
            }
            return 0
        })

    const onHandleLoadMore = () => {
        setVisibleCount(filteredProducts?.length)
    }

    return (
        <>
            <ToastContainer auto={1000} />
            <section>
                <div className="all-product-page">
                    <article>
                        <div className="all-product-page_top">
                            <div className="all-product-page_heading">
                                <h1 className="all-product-page_title">All Products</h1>
                                <h6 className="all-product-page_nav-link">
                                    <Link to='/' >Home</Link> <img src={rightArrow} alt="" /> Products</h6>
                            </div>

                            <div className="all-product-page_controls">
                               
                                <div className="all-product-page_sorted-by">
                                    <h6>Sort By:</h6>
                                    {/* <h6 onClick={() => setSortBy('relevance')} className={`sort-option ${sortBy === 'relevance' ? 'active' : ''}`}>Relevance</h6> */}
                                    <h6 onClick={() => setSortBy('newest')} className={`sort-option ${sortBy === 'newest' ? 'active' : ''}`}>Newest</h6>
                                    <h6 onClick={() => setSortBy('priceLow')} className={`sort-option ${sortBy === 'priceLow' ? 'active' : ''}`}>Price: Low to High</h6>
                                    <h6 onClick={() => setSortBy('priceHigh')} className={`sort-option ${sortBy === 'priceHigh' ? 'active' : ''}`}>Price: High to Low</h6>
                                </div>

                                <div className="all-product-page_filter-wrapper" style={{ position: 'relative' }}>
                                    <button 
                                        className={`all-product-page_filter-btn ${selectedCategory ? 'active' : ''}`}
                                        onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                                    >
                                        <h6>{selectedCategory ? categories.find(c => c._id === selectedCategory)?.name || 'Filter' : 'Filter'}</h6>
                                        <img src={filter} alt="" />
                                    </button>

                                    {showFilterDropdown && (
                                        <div className="all-product-page_filter-dropdown">
                                            <div 
                                                className={`all-product-page_filter-item ${selectedCategory === '' ? 'active' : ''}`}
                                                onClick={() => {
                                                    setSelectedCategory('')
                                                    setShowFilterDropdown(false)
                                                }}
                                            >
                                                All Products
                                            </div>
                                            {categories.map((cat) => (
                                                <div 
                                                    key={cat._id}
                                                    className={`all-product-page_filter-item ${selectedCategory === cat._id ? 'active' : ''}`}
                                                    onClick={() => {
                                                        setSelectedCategory(cat._id)
                                                        setShowFilterDropdown(false)
                                                    }}
                                                >
                                                    {cat.name}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                             {/* <div className="all-product-page_search-box">
                                    <input 
                                        type="text" 
                                        placeholder="Search products..." 
                                        value={searchInput} 
                                        onChange={(e) => setSearchInput(e.target.value)}
                                        onKeyDown={handleSearchKeyDown}
                                        className="all-product-page_search-input"
                                    />
                                    <button onClick={handleSearchClick} className="all-product-page_search-btn">
                                        <FaSearch />
                                    </button>
                                </div> */}

                        </div>
                    </article>

                    <article>
                        <div className="all-product-page_bottom">
                            <div className="all-product-page_grid">
                                {filteredProducts?.slice(0, visibleCount).map((product) => (
                                    <div className="all-product-page_card" key={product._id}>
                                        <div className="all-product-page_image">
                                            <Link to={`/product/${product._id}`}> 
                                                <img src={`http://localhost:5000/uploads/${product.image}`} alt={product.name} />
                                            </Link>
                                            <div className="all_product-wishlistIcon_box">
                                                <svg onClick={() => wishlistAdd(product._id)} className={`all_product-wishlistIcon_img ${wishlist.some((item) => item._id === product._id) ? 'active' : ''}  `} width="33" height="29" viewBox="0 0 33 29" fill="white" stroke='currentColor' xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M28.9172 3.54347C28.1842 2.81009 27.3138 2.22831 26.3559 1.83139C25.3979 1.43446 24.3712 1.23016 23.3343 1.23016C22.2974 1.23016 21.2706 1.43446 20.3127 1.83139C19.3548 2.22831 18.4844 2.81009 17.7514 3.54347L16.2301 5.06479L14.7088 3.54347C13.2281 2.06278 11.2199 1.23093 9.12588 1.23093C7.03189 1.23093 5.02366 2.06278 3.54298 3.54347C2.0623 5.02417 1.23047 7.03242 1.23047 9.12644C1.23047 11.2205 2.0623 13.2287 3.54298 14.7094L5.06429 16.2307L16.2301 27.3967L27.3959 16.2307L28.9172 14.7094C29.6506 13.9764 30.2323 13.106 30.6293 12.1481C31.0262 11.1901 31.2305 10.1634 31.2305 9.12644C31.2305 8.08952 31.0262 7.06276 30.6293 6.10481C30.2323 5.14687 29.6506 4.27651 28.9172 3.54347Z" stroke="#00354B" strokeWidth="2.46035" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="all-product-page_card-text">
                                            <h1 className="all-product-page_card-title">{product.name}</h1>
                                            <div className="all-product-page_price-group">
                                                <h1 className="all-product-page_new-price">Rs ₹{product.price}</h1>
                                                <h1 className="all-product-page_old-price">Rs ₹{product.salePrice}</h1>
                                            </div>
                                        </div>
                                        <Link to='/cart' className="all-product-page_card-btn" onClick={() => onCartAdd(product._id)}>Add To Cart</Link>
                                    </div>
                                ))}
                            </div>
                            {visibleCount < filteredProducts?.length &&
                                <div className="all-product-page_load-more-btn">
                                    <button onClick={onHandleLoadMore}>Load More</button>
                                </div>
                            }
                        </div>
                    </article>
                </div>
            </section>
        </>
    )
}

export default AllProducts