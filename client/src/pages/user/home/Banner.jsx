import React from 'react'
import bgBanner from '../../../assets/images/bg-banner.png'
import bannerBottle from '../../../assets/images/banner-bottle.png'
import blackPerfume from '../../../assets/images/black-perfume.png'
import orangePerfume from '../../../assets/images/orange-perfume.png'
import luxuaryPerfume from '../../../assets/images/luxury-perfume.png'
import offerSticker from '../../../assets/images/offer-sticker.png'
import service from '../../../assets/images/service.png'
import payment from '../../../assets/images/payment.png'
import delivery from '../../../assets/images/delivery.png'
import { Link } from 'react-router-dom'



const Banner = () => {
  return (
    <section>

       <article>
        <div className="navbar-discount">
          <h1>ENJOY FESTIVE DISCOUNTS! FREE SHIPPING ABOVE 999 !</h1>
        </div>
        <div className="banner">

          <div className="banner-content">
            <img src={bgBanner} alt="" className='banner-bg' />
            <div className="banner-text">
              <h1>Discover perfumes that <br />celebrate individuality</h1>
              <p>Every moment with an unforgettable <br /> essence.</p>
              <Link to='/all-products'>Shop Now</Link>
            </div>
            <img src={bannerBottle} alt="" />
            <img src={bannerBottle} alt="" />
          </div>
        </div>
      </article>
     <article>
        <div className="banner-cards">
          <div className="exclusive-offer-cards">
            <div className="exclusive-offer-text-1">
              <h1>Unlock Exclusive <br /> Offers</h1>
              <p>Discover special deals <br /> tailored just for you!</p>
            </div>
            <img src={orangePerfume} alt="" className='exclusive-offer-img-1' />
          </div>
          <div className="exclusive-offer-cards">
            <div className="exclusive-offer-text-2">
              <h1>Gift a Scents to your loved one. </h1>
              <p> Make your love more beautiful</p>
            </div>
            <img src={blackPerfume} alt="" className='exclusive-offer-img-2' />
          </div>
          <div className="exclusive-offer-cards">
            <div className="exclusive-offer-text-3">
              <h1>Luxury Scents Starting <br />at ₹4,000</h1>
            </div>
            <img src={luxuaryPerfume} alt="" className='exclusive-offer-img-3' />
            <img src={offerSticker} alt="" className='offer-sticker' />
          </div>
        </div>
      </article>

      <article>
        <div className="customer-service-section">
          <div className="customer-service-section-items">
            <img src={delivery} alt="" />
            <div className="customer-service-section-text">
              <h1>Fast & Reliable Delivery</h1>
              <p>Get your orders delivered on <br />time, every time.</p>
            </div>
          </div>
          <div className="customer-service-section-items">
            <img src={payment} alt="" />
            <div className="customer-service-section-text">
              <h1>Secure Payments</h1>
              <p>Shop with confidence using our <br />encrypted payment gateways.</p>
            </div>
          </div>
          <div className="customer-service-section-items">
            <img src={service} alt="" />
            <div className="customer-service-section-text">
              <h1>24/7 Customer Support</h1>
              <p>We're here to assist you anytime, <br />anywhere.</p>
            </div>
          </div>

        </div>
      </article> 
    </section>
  )
}

export default Banner