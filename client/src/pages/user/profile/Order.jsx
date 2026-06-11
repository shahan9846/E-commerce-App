import React, { useEffect, useState } from 'react'
import { fetchUserOrders, returnOrderRequest, cancelOrderItem } from '../../../services/user-api-service/OrderApi';
import perufume from '../../../assets/images/perfume.png'
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner'

const Order = () => {

  const [orders, setOrders] = useState([])
  const [orderDatails, setOrderDetails] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [showOrder, setShowOrder] = useState(null)
  const [profileOpen, setProfileOpen] = useState(false);
  const [returnOrder, setReturnOrder] = useState(null)

  const [selectedOrderId, setSelectedOrderId] = useState(null)
  const navigate = useNavigate();
  const toggleProfile = () => setProfileOpen(!profileOpen);


  const [returnModalOpen, setReturnModalOpen] = useState(false);
  const [selectedReason, setSelectedReason] = useState('');
  const [otherReason, setOtherReason] = useState('');
  const openReturnModal = (orderId) => {
    setSelectedOrderId(orderId);
    setReturnModalOpen(true);
  };
  const closeReturnModal = () => {
    setReturnModalOpen(false);
    setSelectedReason('');
    setOtherReason('');
  };
  const handleReturnSubmit = async (e) => {
    e.preventDefault()
    try {
      console.log(selectedReason)
      const responseData = await returnOrderRequest(selectedOrderId, selectedReason);
      console.log(responseData)
      setReturnOrder(responseData)

      // Close the modal after a short delay so the user sees it submitted, or close it immediately
      setReturnModalOpen(false)
      toast.warning('Your return request is submitted, we will notify once it is approved')
      fetchOrders(); // Optional: Refresh your orders to reflect the new status in the list
    } catch (error) {
      console.log(error.response?.message || error.message)
    }
  };

  const fetchOrders = async () => {
    try {
      const data = await fetchUserOrders();
      console.log(data)
      setOrders(data);               // data is the populated orders array
    } catch (err) {
      console.error("Failed to load orders:", err);
    }
  };


  useEffect(() => {
    fetchOrders();   // runs only once
  }, []);

  const openModal = (order, item) => {
    setOrderDetails(true)
    // Store both the full order and the specific item to display in the modal
    setShowOrder({ order, item })
  }


  const closeModal = () => {
    setIsClosing(true)
    setTimeout(() => {
      setOrderDetails(false)
      setIsClosing(false)
    }, 300)
  }

  const cancelOrder = async (orderId, productId) => {
    try {
      if (!window.confirm('Are you sure you want cancel the product')) {
        setOrderDetails(false);
        return;
      }

      await cancelOrderItem(orderId, productId);
      await fetchOrders();   // refresh the whole list after deletion
      setOrderDetails(false);
    } catch (err) {
      console.error(err);
      alert(
        err.response?.data?.message ||
        "Something went wrong while cancelling the order"
      );
    }
  };



  return (
    <>
      <div className="order_section">
        <div className="order_cards">
          {orders.length > 0 ? (

            orders.map(order =>
              order.orderItems.map((item, index) => (
                <div className="order_card" key={order._id + '_' + index} onClick={() => openModal(order, item)}>
                  <div className="order_card_head">
                    <p>Order ID: #{order._id}</p>
                    <p className="order_status">
                      {item.deliveryStatus}
                    </p>
                  </div>
                  <div className="order_body" key={index}>
                    <div className="order_img">
                      <img
                        src={`http://localhost:5000/uploads/${item.product.image}`}
                        alt=""
                      />
                    </div>
                    <div className="order_details">
                      <h1 className="order_title">
                        {item.product.name}
                      </h1>
                      <h1 className="order_qty">
                        Qty: {item.quantity}
                      </h1>
                      <h1 className="order_price">
                        ₹{item.price}
                      </h1>
                    </div>
                  </div>
                </div>
              ))
            )
          ) : (
            <p style={{ color: '#919191ff', fontFamily: 'Poppins', fontSize: '14px' }}>No Orders...</p>
          )}
        </div>
      </div>

      {orderDatails &&
        <div className={`modal_overlay ${isClosing ? 'modal_overlay_closing' : ''}`} onClick={closeModal}>
          <div className={`modal_box ${isClosing ? 'modal_box_closing' : ''}`} onClick={e => e.stopPropagation()}>

            {/* Top Section */}

            <div className="modal_header">
              <h1 className="modal_title">Order Details</h1>
              <button className="modal_close_btn" onClick={closeModal}>×</button>
            </div>
            <div className="modal_order">
              <div className="modal_order_info">
                <p className="modal_order_id">
                  Order ID: #{showOrder.order._id}
                </p>
                <p className="modal_order_date">
                  Placed on: {showOrder.order.createdAt.split('T')[0]}
                </p>
              </div>
              <p className="modal_order_status">
                {showOrder.item.deliveryStatus}
              </p>
            </div>

            <hr className='modal_hr' />

            <div className="modal_products">
              <h2 className="modal_section_title">
                Order Item
              </h2>
              <div className="modal_product_card">
                <div className="modal_product_image">
                  <img src={`http://localhost:5000/uploads/${showOrder.item.product.image}`} alt="" />
                </div>
                <div className="modal_product_details">
                  <h1 className="modal_product_name">
                    {showOrder.item.product.name}
                  </h1>
                  <p className="modal_product_quantity">
                    Qty: {showOrder.item.quantity}
                  </p>
                  <h2 className="modal_product_price">
                    ₹{showOrder.item.price}
                  </h2>
                </div>
                <div style={{ marginLeft: 'auto', marginRight: '8px' }}>
                  <div >
                    {showOrder.item.deliveryStatus === 'Cancelled' ? (
                      <button disabled className='order-cancel-btn' style={{ backgroundColor: "gray", cursor: "not-allowed", opacity: 0.7 }}>Cancelled</button>
                    ) : showOrder.item.deliveryStatus !== 'Delivered' ? (
                      <button onClick={() => cancelOrder(showOrder.order._id, showOrder.item._id)} className='order-cancel-btn'>Cancel</button>
                    ) : (
                      (showOrder.order.isReturned || returnOrder?.success === true) ? (
                        <button disabled className="order-cancel-btn" style={{ backgroundColor: "orange", cursor: "not-allowed" }}>
                          Return {returnOrder?.status || showOrder.order.returnStatus || 'Requested'}
                        </button>
                      ) : (
                        <button className='order-cancel-btn' onClick={() => openReturnModal(showOrder.order._id)}>Return</button>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>


            {/* Return Reason Modal */}
            {returnModalOpen && (
              <div className={`modal_overlay ${isClosing ? 'modal_overlay_closing' : ''}`} onClick={closeReturnModal}>
                <div className={`modal_box ${isClosing ? 'modal_box_closing' : ''}`} onClick={e => e.stopPropagation()}>
                  <div className="modal_header">
                    <h1 className="modal_title">Return Request</h1>
                    <button className="modal_close_btn" onClick={closeReturnModal}>×</button>
                  </div>
                  <form action="" onSubmit={handleReturnSubmit}>
                    <div className="modal_body" style={{ padding: '1rem' }}>
                      <select value={selectedReason} onChange={e => setSelectedReason(e.target.value)} className="return-select" style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}>
                        <option value="" disabled>Select Reason</option>
                        <option>Damaged Product</option>
                        <option>Wrong Item Received</option>
                        <option>Defective Product</option>
                        <option>Item Not as Described</option>
                        <option>Size/Color Mismatch</option>
                        <option>Other</option>
                      </select>
                      {selectedReason === 'Other' && (
                        <textarea value={otherReason} onChange={e => setOtherReason(e.target.value)} placeholder="Provide additional details" style={{ width: '100%', height: '80px', marginBottom: '0.5rem' }} />
                      )}
                      <button className="order-cancel-btn" type='submit'>Submit Return</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
            {/* Price Summary */}
            <div className="modal_summary">
              <h2 className="modal_section_title">
                Order Summary
              </h2>
              <div className="modal_summary_row">
                <p>Price</p>
                <p>₹{showOrder.item.price}</p>
              </div>
              <div className="modal_summary_row">
                <p>Discount</p>
                <p>-₹0</p>
              </div>
              <div className="modal_summary_row">
                <p>Delivery Charge</p>
                <p style={{ color: 'green' }}>FREE</p>
              </div>
              <hr className='modal_hr' />
              <div className="modal_summary_total">
                <h3 style={{ fontSize: '15px' }}>Total Amount</h3>
                <h3>₹{showOrder.item.price}</h3>
              </div>
              <hr className='modal_hr' />
            </div>


            {/* Address + Payment */}
            <div className="modal_bottom_section">
              <div className="modal_address">
                <h2 className="modal_section_title" style={{ marginBottom: '5px' }}>
                  Shipping Address
                </h2>
                <div className="modal_address_details" style={{ fontSize: '14px' }}>
                  <p>{showOrder.order.shippingAddress?.fullName}</p>
                  <p>{showOrder.order.shippingAddress?.street}</p>
                  <p>{showOrder.order.shippingAddress?.city},</p>
                  <p>{showOrder.order.shippingAddress?.state},</p>
                  <p>{showOrder.order.shippingAddress?.country}</p>
                </div>
              </div>
              <div className="modal_payment" style={{ width: '47%' }}>
                <h2 className="modal_section_title" style={{ marginBottom: '5px' }}>
                  Payment Information
                </h2>
                <div className="modal_payment_row">
                  <p>Payment Method</p>
                  <p>{showOrder.order.paymentMethod}</p>
                </div>
                <div className="modal_payment_row">
                  <p>Payment Status</p>
                  <p>{showOrder.order.paymentStatus}</p>
                </div>
                <div className="modal_payment_row">
                  <p>Total Amount</p>
                  <p>₹{showOrder.item.price}</p>
                </div>
              </div>
            </div>
            <hr className='modal_hr' />


            {/* Timeline */}
            {/* <div className="order_timeline">
              <h1 className='modal_section_title'>Order Details</h1>
              <div className="timeline_items">
                <div className="timeline_item">
                  <div className="timeline_top">
                    <div className="timeline_active_circle"></div>
                    <div className="timeline_active_line"></div>
                  </div>
                  <div className="timeline_active_text">
                    <h4 style={{ color: 'green' }}>{showOrder.item.deliveryStatus}</h4>
                  </div>
                </div>
                <div className="timeline_item">
                  <div className="timeline_top">
                    <div className="timeline_circle"></div>
                    <div className="timeline_active_line"></div>
                  </div>
                  
                </div>
                <div className="timeline_item">
                  <div className="timeline_top">
                    <div className="timeline_circle"></div>
                    <div className="timeline_active_line"></div>
                  </div>
                </div>
                <div className="timeline_item">
                  <div className="timeline_top">
                    <div className="timeline_circle"></div>
                    <div className="timeline_active_line"></div>
                  </div>
                </div>
                <div className="timeline_item">
                  <div className="timeline_top">
                    <div className="timeline_circle"></div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>

      }
    </>
  )
}

export default Order
