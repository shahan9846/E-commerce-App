import React, { useContext, useEffect } from 'react'
import rightArrow from '../../../assets/images/rightArrow.png'
import { Link } from 'react-router-dom'
import { CartContext } from '../../../contexts/CartContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { WishlistContext } from '../../../contexts/WishlistContext'
import { fetchWishlist } from '../../../services/user-api-service/wishlistApi'


const Wishlist = () => {

  const { onCartAdd } = useContext(CartContext)

  const { wishlist, setWishlist, wishlistDelete } = useContext(WishlistContext)

  useEffect(() => {
    const loadWishlist = async () => {
      try {
        const data = await fetchWishlist()
        setWishlist(data.wishlist)
      } catch (error) {
        console.error("Failed to load wishlist", error)
      }
    }
    loadWishlist()
  }, [])

  const validWishlist = wishlist.filter(product => product !== null)

  return (
    <>
      <ToastContainer autoClose={3000} />
      <section>
        <div className="wishlist">
          <div className="wishlist-heading">
            <h1 className="wishlist-title">Wishlist</h1>
            <h6 className="wishlist-nav_links"><Link to='/'>Home</Link> <img src={rightArrow} alt="" /> Wishlist</h6>
          </div>
          <div className="wishlist-section">
            <div className="wishlist-main_section_grid">
              {validWishlist.length > 0 ? (
                validWishlist.map((product) => (
                  <div className="wishlist-main_section_card" key={product._id}>
                    <div className="wishlist-main_section_item_images">
                      <img src={`http://localhost:5000/uploads/${product.image}`} alt="" />
                    </div>
                    <div className="wishlist-main_section_item_details">
                      <h1 className="wishlist-main_section_item_title">{product.name}</h1>

                      <div className="wishlist-main_section_item_price_group">
                        <h1 className="wishlist-main_section_item_new_price">Rs ₹{product.price}</h1>
                        <h6 className="wishlist-main_section_item_old_price">Rs ₹{product.salePrice}</h6>
                        <h6 className="wishlist-main_section_item_price_offer">61% off</h6>
                      </div>
                      <div className="wishlist-main_section_buttons">
                        <button className="wishlist-main_section_button delete" onClick={() => wishlistDelete(product._id)}>Delete</button>
                        <Link to='/cart' className="wishlist-main_section_button cart" onClick={() => onCartAdd(product._id)}>Add To Cart</Link>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p style={{ color: '#919191ff', fontFamily: 'Poppins', fontSize: '18px' }}>You haven't added any product yet! <br /> Click ❤️ to save products<Link to='/all-products' className='wishlist-shop_now-btn'>Find items to save</Link></p>
              )}

            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Wishlist