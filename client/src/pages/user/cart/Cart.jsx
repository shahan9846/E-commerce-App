import React, { useContext, useEffect } from 'react'
import rightArrow from '../../../assets/images/rightArrow.png'
import { Link } from 'react-router-dom'
import { CartContext } from '../../../contexts/CartContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { fetchCart } from '../../../services/user-api-service/cartApi'


const Cart = () => {

  const { cart, setCart, onCartDelete, onQtyDec, onQtyInc } = useContext(CartContext)

  const validCart = cart.filter(item => item && item.product !== null)

  const totalQuantity = validCart.reduce((sum, item) => sum + item.quantity, 0)

  const totalPrice = validCart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)


  const getRemainingStock = (stock, quantity) => {
    return stock - quantity
  }

  // console.log(remaining_stock)

  useEffect(() => {
    const loadCart = async () => {
      try {
        const data = await fetchCart();
        setCart(data.cart);
      } catch (error) {
        console.log(error);
      }
    };

    loadCart();
  }, []);



  return (
    <>
      <ToastContainer auto={2000} />

      <section>
        <div className="cart">
          <div className="cart-heading">
            <h1 className="cart-title">Cart</h1>
            <h6 className="cart-nav_links"><Link to='/'>Home</Link> <img src={rightArrow} alt="" /> Cart</h6>
          </div>
          <div className="cart-section">
            <div className="cart-main_section_grid">
              {validCart.length > 0 ? (

                validCart.map(data => (

                  <div className="cart-main_section_card" key={data.product._id}>
                    <div className="cart-main_section_item_images">
                      <img src={`http://localhost:5000/uploads/${data.product.image}`} alt="" />
                    </div>
                    <div className="cart-main_section_item_details">
                      <h1 className="cart-main_section_item_title">{data.product.name}</h1>
                      <div className="cart-main_section_item_quantity">
                        <button className="cart-main_section_item_quantity_dec" onClick={() => onQtyDec(data.product._id)} disabled={data.quantity === 0}>-</button>
                        <h1 className="cart-main_section_item_quantity_number">{data.quantity}</h1>
                        <button className="cart-main_section_item_quantity_inc" onClick={() => onQtyInc(data.product._id)} disabled={data.quantity >= data.product.stock}>+</button>
                      </div>
                      <div className="cart-main_section_item-stock_left">
                        <h6>Hurry only {getRemainingStock(data.product.stock, data.quantity)} stocks left!</h6>
                      </div>
                      <div className="cart-main_section_item_price_group">
                        <p className="cart-main_section_item_new_price">Rs ₹{data.product.price * data.quantity}</p>
                        <h6 className="cart-main_section_item_old_price">Rs ₹{data.product.salePrice}</h6>
                        <h6 className="cart-main_section_item_price_offer">61% off</h6>
                      </div>
                      <div className="cart-main_section_buttons">
                        <button className="cart-main_section_delete_buttons" onClick={() => onCartDelete(data.product._id)}>Delete</button>
                        {/* <Link className="cart-main_section_share_buttons">Share</Link> */}
                        {/* <Link to='/payment' className="cart-main_section_buy_buttons">Buy</Link> */}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p style={{ color: '#919191ff', fontFamily: 'Poppins', fontSize: '18px' }}>Your cart is empty! <Link to='/all-products' className='cart-shop_now-btn'>Shop Now</Link></p>

              )}
            </div>

            {validCart.length > 0 &&
              <div className="cart-price_details_section">
                <div className="cart-price_details">
                  <div className="cart-price_methods">
                    <h1 className='cart-price_methods_title'>Check Out</h1>
                    <div className="cart-all_price">
                      <h6 className='cart-price_text'>Price ({totalQuantity} item)</h6>
                      <h6 className='cart-price'>Rs ₹{totalPrice}</h6>
                    </div>
                    <div className="cart-all_price">
                      <h6 className='cart-price_text'>Discount</h6>
                      <h6 className='cart-price'>Rs ₹0</h6>
                    </div>
                    <div className="cart-all_price">
                      <h6 className='cart-price_text'>Delivery Charge</h6>
                      <h6 className='cart-price_free_text'>Free</h6>
                    </div>
                  </div>
                  <div className="cart-total_price">
                    <h6 className="cart-total_price_text">Total Amount</h6>
                    <h6 className='cart-total_amount'>Rs ₹{totalPrice}</h6>
                  </div>
                </div>
                <Link to='/payment' className="cart-price_details_buy_btn">Proceed To Buy</Link>
              </div>
            }
          </div>
        </div>
      </section>
    </>
  )
}

export default Cart