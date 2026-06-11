import React, { useContext } from 'react'
import perfume1 from '../../../assets/images/perfume1.png'
import perfume2 from '../../../assets/images/perfume2.png'
import perfume3 from '../../../assets/images/perfume3.png'
import pinnedIcon from '../../../assets/images/pinned.png'
import shareIcon from '../../../assets/images/Share.png'
import arrowLeft from '../../../assets/images/arrowLeft.png'
import arrowRight from '../../../assets/images/arrowRight.png'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ProductsContext } from '../../../contexts/ProductsContext'
import { CartContext } from '../../../contexts/CartContext'
import useCarousel from '../../../hooks/useCarousel'
import { WishlistContext } from '../../../contexts/WishlistContext'
import { ToastContainer } from 'react-toastify'



const Product = () => {


  const { products } = useContext(ProductsContext)
  const { onCartAdd } = useContext(CartContext)
  const { wishlistAdd, wishlist } = useContext(WishlistContext)

  const { id } = useParams();

  const { index, onPrevious, onNext } = useCarousel(products.length)

  const product = products.find((item) => item._id === id)

  const navigate = useNavigate()

  const handleBuyNow = (productId) => {
    // console.log(productId)
    navigate(`/payment/${productId}`);
  };

  // const is_Wishlist_add = wishlist.some(item => item._id.toString() === product._id.toString())

  // useEffect(() => {
  //   fetchProduct(id);
  // }, [id]);

  // console.log(product);

  // if(!product){
  //   return <h1>Loading...</h1>
  // }

  if (!product) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <ToastContainer auto={1000} />

      <section>
        <div className="single_product">
          <article>
            <div className="single_product-container">
              <div className="single_product-nav_links">
                <h6> <Link to='/'>Home</Link>  <img src={arrowRight} alt="" /><Link to='/all-products' >Product </Link> <img src={arrowRight} alt="" />{product.name}</h6>
              </div>
              <div className="single_product-grid">
                <div className="single_product-card">
                  <div className="single_product-card_images">
                    <div className="single_product-card_img_gallery">
                      <div className="single_product-img_box">
                        <img src={`http://localhost:5000/uploads/${product.image}`} alt="" />
                      </div>
                      <div className="single_product-img_box">
                        <img src={perfume2} alt="" />
                      </div>
                      <div className="single_product-img_box">
                        <img src={perfume3} alt="" />
                      </div>
                    </div>
                    <div className="single_product-card_main_images">
                      <img src={`http://localhost:5000/uploads/${product.image}`} alt="" className="single_product-main_img" />
                    </div>
                    <div className="single_product-wishlistIcon_box">
                      <svg onClick={() => wishlistAdd(product._id)} className={`all_product-wishlistIcon_img ${wishlist.some((item) => item._id === product._id) ? 'active' : ''}  `} width="33" height="29" viewBox="0 0 33 29" fill="white" stroke='currentColor' xmlns="http://www.w3.org/2000/svg">
                        <path d="M28.9172 3.54347C28.1842 2.81009 27.3138 2.22831 26.3559 1.83139C25.3979 1.43446 24.3712 1.23016 23.3343 1.23016C22.2974 1.23016 21.2706 1.43446 20.3127 1.83139C19.3548 2.22831 18.4844 2.81009 17.7514 3.54347L16.2301 5.06479L14.7088 3.54347C13.2281 2.06278 11.2199 1.23093 9.12588 1.23093C7.03189 1.23093 5.02366 2.06278 3.54298 3.54347C2.0623 5.02417 1.23047 7.03242 1.23047 9.12644C1.23047 11.2205 2.0623 13.2287 3.54298 14.7094L5.06429 16.2307L16.2301 27.3967L27.3959 16.2307L28.9172 14.7094C29.6506 13.9764 30.2323 13.106 30.6293 12.1481C31.0262 11.1901 31.2305 10.1634 31.2305 9.12644C31.2305 8.08952 31.0262 7.06276 30.6293 6.10481C30.2323 5.14687 29.6506 4.27651 28.9172 3.54347Z" stroke="#00354B" strokeWidth="2.46035" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    {/* <div className="single_product-shareIcon_box">
                      <img src={shareIcon} alt="" className="single_product-shareIcon_img" />
                    </div> */}
                  </div>
                  <button className="single_product-buy-btn" onClick={() => handleBuyNow(product._id)}>Purchase Now</button>
                  <Link to='/cart' className="single_product-cart-btn" onClick={() => onCartAdd(product._id)}>Add To Cart</Link>
                </div>
                <div className="single_product-details">
                  <div className="single_product-heading">
                    <h1 className="single_product-title">{product.name}</h1>
                    <div className="single_product-rating">
                      {/* <h6 className="single_product-star_rating">{product.rating.rate}<img src={starIcon} alt="" /></h6> */}
                      {/* <h6 className="single_product-rating_count">{product.rating.count} Rating</h6> */}
                    </div>
                    <div className="single_product-stock_left">
                      <h6>Hurry only {product.stock} stocks left!</h6>
                    </div>
                  </div>
                  <div className="single_product-price_group">
                    <h1 className="single_product-new_price">Rs ₹{product.price}</h1>
                    <h6 className="single_product-old_price">Rs ₹{product.salePrice}</h6>
                    <h6 className="single_product-price_offer">61% off</h6>
                  </div>

                  <div className="single_product-delivery_date">
                    <h1 className="single_product-delivery_date_title">Delivery</h1>
                    <h6 className="single_product-delivery_description">Delivery by 28 Aug, Wednesday | Free <br />if ordered before 9:24 PM</h6>
                  </div>
                  <div className="single_product-description">
                    <h1 className="single_product-description_title">Description</h1>
                    <h6 className="single_product-description_text">{product.description}</h6>
                  </div>
                  <div className="single_product-available_offers">
                    <h1 className="single_product-available_offer_title">Available Offers</h1>
                    <div className="single_product-available_offer_text">
                      <h6><img src={pinnedIcon} alt="" />Buy two of the same product and get a third one free.</h6>
                      <h6><img src={pinnedIcon} alt="" />Enjoy free standard shipping on orders exceeding ₹1,399.</h6>
                      <h6><img src={pinnedIcon} alt="" />Get 15% off your first order</h6>
                      <h6><img src={pinnedIcon} alt="" />Receive a free tool case with the purchase of any perfume over ₹2,000</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
          <article>
            <div className="single_product-suggestions">
              <div className="single_product-suggestions-head">
                <h1 className='single_product-suggestions-title'>Suggested for you</h1>
                <div className="single_product-suggestions-arrows">
                  <svg className="single_product-suggestions-arrow-buttons" src={arrowLeft} alt='' onClick={onPrevious} width="18" height="29" viewBox="0 0 18 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.6001 0.745677C16.8447 0.98051 17.0387 1.25945 17.1711 1.56652C17.3034 1.8736 17.3716 2.20278 17.3716 2.53523C17.3716 2.86767 17.3034 3.19685 17.1711 3.50393C17.0387 3.811 16.8447 4.08994 16.6001 4.32477L6.36436 14.1736L16.6001 24.0225C17.0934 24.4971 17.3705 25.1408 17.3705 25.8121C17.3705 26.4833 17.0934 27.127 16.6001 27.6016C16.1068 28.0762 15.4378 28.3429 14.7402 28.3429C14.0427 28.3429 13.3737 28.0762 12.8804 27.6016L0.771641 15.9505C0.527081 15.7157 0.333057 15.4367 0.200674 15.1297C0.0682926 14.8226 0.000152588 14.4934 0.000152588 14.1609C0.000152588 13.8285 0.0682926 13.4993 0.200674 13.1922C0.333057 12.8852 0.527081 12.6062 0.771641 12.3714L12.8804 0.720292C13.8829 -0.244287 15.5712 -0.244287 16.6001 0.745677Z" fill="black" />
                  </svg>
                  <svg className="single_product-suggestions-arrow-buttons" src={arrowRight} alt='' onClick={onNext} width="18" height="29" viewBox="0 0 18 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.77149 0.745677C0.526931 0.98051 0.332907 1.25945 0.200524 1.56652C0.068142 1.8736 0 2.20278 0 2.53523C0 2.86767 0.068142 3.19685 0.200524 3.50393C0.332907 3.811 0.526931 4.08994 0.77149 4.32477L11.0072 14.1736L0.77149 24.0225C0.278229 24.4971 0.00111704 25.1408 0.00111704 25.8121C0.00111704 26.4833 0.278229 27.127 0.77149 27.6016C1.26475 28.0762 1.93376 28.3429 2.63133 28.3429C3.32891 28.3429 3.99791 28.0762 4.49118 27.6016L16.5999 15.9505C16.8445 15.7157 17.0385 15.4367 17.1709 15.1297C17.3033 14.8226 17.3714 14.4934 17.3714 14.1609C17.3714 13.8285 17.3033 13.4993 17.1709 13.1922C17.0385 12.8852 16.8445 12.6062 16.5999 12.3714L4.49118 0.720292C3.48871 -0.244287 1.80034 -0.244287 0.77149 0.745677Z" fill="black" />
                  </svg>
                  {/* <img className="single_product-suggestions-arrow-buttons" src={arrowLeft} alt='' onClick={onPrevious} />
                  <img className="single_product-suggestions-arrow-buttons" src={arrowRight} alt='' onClick={onNext} /> */}
                </div>
              </div>
              <div className="single_product-suggestions-products-carousel">

                <div className="single_product-suggestions-products-track" style={{ transform: `translateX(-${index * 420}px)` }}>
                  {products.map((item) => (
                    <div className="single_product-suggestions-products-card" key={item._id}>
                      <div className="single_product-suggestions-products-image">
                        <Link to={`/product/${item._id}`}><img src={`http://localhost:5000/uploads/${item.image}`} alt="" /></Link>
                        <div className="all_product-wishlistIcon_box">
                          <svg onClick={() => wishlistAdd(item._id)} className={`all_product-wishlistIcon_img ${wishlist.some((p) => p._id === item._id) ? 'active' : ''}  `} width="33" height="29" viewBox="0 0 33 29" fill="white" stroke='currentColor' xmlns="http://www.w3.org/2000/svg">
                            <path d="M28.9172 3.54347C28.1842 2.81009 27.3138 2.22831 26.3559 1.83139C25.3979 1.43446 24.3712 1.23016 23.3343 1.23016C22.2974 1.23016 21.2706 1.43446 20.3127 1.83139C19.3548 2.22831 18.4844 2.81009 17.7514 3.54347L16.2301 5.06479L14.7088 3.54347C13.2281 2.06278 11.2199 1.23093 9.12588 1.23093C7.03189 1.23093 5.02366 2.06278 3.54298 3.54347C2.0623 5.02417 1.23047 7.03242 1.23047 9.12644C1.23047 11.2205 2.0623 13.2287 3.54298 14.7094L5.06429 16.2307L16.2301 27.3967L27.3959 16.2307L28.9172 14.7094C29.6506 13.9764 30.2323 13.106 30.6293 12.1481C31.0262 11.1901 31.2305 10.1634 31.2305 9.12644C31.2305 8.08952 31.0262 7.06276 30.6293 6.10481C30.2323 5.14687 29.6506 4.27651 28.9172 3.54347Z" stroke="#00354B" strokeWidth="2.46035" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      </div>
                      <div className="single_product-suggestions-products-text">
                        <h1 className="single_product-suggestions-products-title">{item.name.slice(0, 30) + ('...')}</h1>
                        <div className="single_product-suggestions-products-price-group">
                          <h1 className="single_product-suggestions-products-price-new">Rs ₹{item.price}</h1>
                          <h1 className="single_product-suggestions-products-price-old">Rs ₹{item.salePrice}</h1>
                        </div>

                      </div>
                      <Link to='/cart' className='single_product-suggestions-products-button' onClick={() => onCartAdd(item._id)}>Add To Cart</Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>
    </>
  )
}

export default Product