import React, { useContext, useEffect, useState } from 'react'
import bankIcon from '../../../assets/images/bank.png'
import cashIcon from '../../../assets/images/cash.png'
import creditIcon from '../../../assets/images/credit-icon.png'
import upiIcon from '../../../assets/images/upi-icon.png'
import googlePayIcon from '../../../assets/images/google-pay.png'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { CartContext } from '../../../contexts/CartContext'
import { fetchProductsById } from '../../../services/user-api-service/productApi'
import { fetchCart } from '../../../services/user-api-service/cartApi'
import { createOrder, verifyPayment } from '../../../services/user-api-service/OrderApi'
import { fetchAddress } from '../../../services/user-api-service/addressApi'
import { fetchUserProfile } from '../../../services/user-api-service/profileApi'
import successImg from '../../../assets/images/success.png'

const PaymentPage = () => {

  const { cart, onCartClear } = useContext(CartContext)

  const [addresses, setAddresses] = useState([])
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");

  const navigate = useNavigate()

  const [user, setUser] = useState([])
  const [checkoutItems, setCheckoutItems] = useState([]);

  const token = localStorage.getItem('token')

  const { id } = useParams();

  const totalQuantity = checkoutItems.reduce((sum, item) => sum + item.quantity, 0)

  const totalPrice = checkoutItems.reduce((sum, item) => sum + item.price * item.quantity, 0)


  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };


  const razorpayPayment = async (data) => {
    try {
      console.log("==== handlePayment 1");

      const isScriptLoaded = await loadRazorpayScript();
      if (!isScriptLoaded) {
        alert(
          "Failed to load Razorpay SDK. Please check your internet connection."
        );
        return;
      }
      console.log("==== handlePayment 2");

      // Initialize Razorpay
      const options = {
        key: "rzp_test_SuFVaiO13f5Yvi", // Razorpay Key ID
        amount: data.amount,
        currency: "INR",
        name: "Fragranzia",
        description: "Purchase Description",
        order_id: data.id,

        handler: async function (response) {
          try {
            const verifyRes = await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verifyRes.success) {
              console.log("inside verifyRes.success");
              setShowSuccessModal(true);
              await onCartClear();
            } else {
              alert("Payment Verification Failed!");
              console.log("elseeeeee");
            }
          } catch (err) {
            console.error("Verification error: ", err);
            alert("Payment verification request failed.");
          }
        },

        theme: {
          color: '#00354B',
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Payment Error:--------------", error);
    }
  };


  const handlePayment = async () => {
    if (addresses.length === 0) {
      alert("Please add an address");
      return;
    }

    if (!paymentMethod) {
      alert("Please select a payment method");
      return;
    }

    try {
      const formattedItems = checkoutItems.map(item => ({
        product: item._id,
        quantity: item.quantity,
        price: item.price
      }));

      const orderData = {
        orderItems: formattedItems,
        shippingAddress: selectedAddress,
        paymentMethod,
        totalPrice
      };

      // Send order details to the backend to create the order
      const response = await createOrder(orderData);
      if (response?.success) {

        // If it's an online payment
        if (response?.razorpayOrder) {
          console.log("Razorpay Order =========  ", response?.razorpayOrder);
          razorpayPayment(response?.razorpayOrder);
        } else {
          console.log("COD Order =========  ", response);
          setShowSuccessModal(true);
          await onCartClear();
        }
      } else {
        alert("Failed to place order");
      }

    } catch (error) {
      console.error(error);
      alert("Failed to place order");
    }
  };

  useEffect(() => {
    const loadCheckOut = async () => {
      try {
        if (id) {
          const single_product = await fetchProductsById(id); // from  service
          setCheckoutItems([{
            _id: single_product._id,
            image: single_product.image,
            name: single_product.name,
            quantity: 1,
            price: single_product.price,
            salePrice: single_product.salePrice
          }]);// convert to array
          // console.log('cart product==========', single_product)
        } else {
          const cart_all_products = await fetchCart()
          // console.log('cart products==========', cart_all_products.cart)
          const formatted_cart = cart_all_products.cart
            .filter(item => item && item.product !== null)
            .map(item => ({
              _id: item.product._id,
              image: item.product.image,
              name: item.product.name,
              quantity: item.quantity,
              price: item.product.price,
              salePrice: item.product.salePrice
            }))
          setCheckoutItems(formatted_cart)
        }
      } catch (error) {
        console.log(error)
      }
    }
    loadCheckOut()
  }, [id, cart]);


  useEffect(() => {
    const loadProfile = async () => {
      if (!token) return;
      try {
        const data = await fetchUserProfile()
        setUser(data)
      } catch (error) {
        alert(error?.response?.data?.message || "Failed to fetch profile")
      }
    }
    loadProfile()
  }, [])


  useEffect(() => {
    const loadAddress = async () => {
      if (!token) {
        navigate('/signup')
        return
      }
      try {
        const data = await fetchAddress()
        const primaryAddress = data.filter(add => add.isDefault);
        setAddresses(primaryAddress);
        if (primaryAddress.length > 0) {
          setSelectedAddress(primaryAddress[0]._id);
        }
        // console.log(addresses)
      } catch (error) {
        alert(error?.response?.data?.message || "Failed to fetch addresses")
      }
    }
    loadAddress()
  }, [])


  return (
    <section>
      <div className="payment_page">
        <div className="payment_page-product_and_personal_details">
          <div className="payment_page-product_details">
            {checkoutItems.map((product) => (
              <div className="payment_page-product_detail_card" key={product._id}>
                <div className="payment_page-product_image">
                  <NavLink to={`/product/${product._id}`}><img src={`http://localhost:5000/uploads/${product.image}`} alt="" /></NavLink>
                </div>
                <div className="payment_page-product_detail_text">
                  <div className="payment_page-product_heading">
                    <h1 className="payment_page-product_title">{product.name}</h1>
                  </div>
                  <h6 className="payment_page-product_quantity_number">Qty: {product.quantity}</h6>
                  <div className="payment_page-product_price_group">
                    <h1 className="payment_page-product_new_price">Rs ₹{product.price}</h1>
                    <h6 className="payment_page-product_old_price">Rs  ₹{product.salePrice}</h6>
                    <h6 className="payment_page-product_price_offer">61% off</h6>
                  </div>
                  <div className="payment_page-product_delivery_details">
                    <h6 className="payment_page-product_delivery_date">Delivered by August 29, Free delivery </h6>
                    <h6 className="payment_page-product_return_date">7 day return policy</h6>
                  </div>
                </div>
              </div>
            ))}

          </div>
          <div className="payment_page-person_detail_section">
            <h1 className="payment_page-person_title">Personal Details</h1>
            <div className="payment_page-person_details">
              <div className="payment_page-person_address_buttons">
                <NavLink to='/address' className="payment_page-person_address_btn">Add address +</NavLink>

              </div>
              <div className="payment_page-person_detail_box">
                <div className="payment_page-person_address_and_edit">
                  <h1 className="payment_page-person_address_title">Address</h1>
                  <NavLink to='/address' className="payment_page-person_edit_title" >Edit</NavLink>
                </div>

                {addresses.map((data) => (
                  <div className="payment_page-person_address" key={data._id}>
                    <div className="payment_page-person_address_above">
                      <h1>{user.name}</h1>
                      {data.isDefault &&
                        <button>Primary</button>
                      }
                    </div>

                    <div>
                      <p>
                        {data.address},<br />
                        {data.street},<br />
                        {data.city},<br />
                        {data.state},<br />
                        {data.country}
                      </p>
                    </div>

                    <p>{user?.phone || ''}</p>
                  </div>
                ))}

              </div>
            </div>
          </div>
        </div>
        <div className="payment_page-price_and_payment_method_details">
          <div className="payment_page-all_prices">
            <div className="payment_page-methods">
              <h1 className='payment_page-methods_title'>Price Details</h1>
              <div className="payment_page-all_price">
                <h6 className='payment_page-text'>Price ({totalQuantity} item)</h6>
                <h6 className='payment_page-price'>Rs ₹{totalPrice}</h6>
              </div>
              <div className="payment_page-all_price">
                <h6 className='payment_page-text'>Discount</h6>
                <h6 className='payment_page-price'>Rs ₹0</h6>
              </div>
              <div className="payment_page-all_price">
                <h6 className='payment_page-text'>Delivery Charge</h6>
                <h6 className='payment_page_free_text'>Free Delivey</h6>
              </div>
              <hr />
            </div>
            <div className="payment_page-total_price">
              <h6 className="payment_page-total_price_text">Total Amount</h6>
              <h6 className='payment_page-total_amount'>Rs ₹{totalPrice}</h6>
            </div>

          </div>
          <div className="payment_page-payment_method">
            <h1 className='payment_page-payment_title'>Payment Methods</h1>
            <div className="payment_page-all_payment_methods">
              <div className="payment_page-upi">
                <h6><img src={cashIcon} alt="" />Cash on delivery (COD)</h6>
                <input type="radio" name="payment" id="" value="COD" onChange={(e) => setPaymentMethod(e.target.value)} style={{ cursor: 'pointer' }} />
              </div>
              <div className="payment_page-upi">
                <h6><img src={upiIcon} alt="" />Paytm/Phone Pay/Google Pay (UPI)</h6>
                <input type="radio" name="payment" id="" value="UPI" onChange={(e) => setPaymentMethod(e.target.value)} style={{ cursor: 'pointer' }} />
              </div>
              {/* <div className="payment_page-upi">
                <h6><img src={creditIcon} alt="" />Credit/Debit card</h6>
                <input type="radio" name="payment" id="" />
              </div> */}
              {/* <div className="payment_page-upi">
                <h6><img src={bankIcon} alt="" />Net Banking</h6>
                <input type="radio" name="payment" id="" value="BANK" onChange={(e) => setPaymentMethod(e.target.value)} style={{ cursor: 'pointer' }} />
              </div> */}
            </div>
            <button onClick={handlePayment} className='payment_page-pay_btn'>Pay Now</button>
          </div>
        </div>
      </div>

      {showSuccessModal && (
        <div className="success_modal-overlay">
          <div className="success_modal-box">
            <div className="success_modal-icon">
              <img src={successImg} alt="" />
            </div>
            <h1 className="success_modal-title">Thank You for Ordering!</h1>
            <p className="success_modal-subtitle">
              Your order has been successfully placed.<br />
              We're preparing it for shipment
            </p>
            <div className="success_modal-buttons">
              <NavLink to='/' className="success_modal-btn-outline">Back to Home</NavLink>
              <NavLink to='/order' className="success_modal-btn-fill">Track Order</NavLink>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default PaymentPage