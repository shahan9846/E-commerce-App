import React from 'react'
import facebook from '../../assets/icons/facebook.svg'
import instagram from '../../assets/icons/instagram.svg'
import linkedIn from '../../assets/icons/linkedIn.svg'
import mail from '../../assets/icons/mail.svg'
import phone from '../../assets/icons/phone.svg'
import twitter from '../../assets/icons/x.svg'
import youtube from '../../assets/icons/youtube.svg'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer>
      <div className="footer">
        <div className="footer_top">
          <div className="footer_brand">
            <h1 className="footer_brand-title">Fragranzia</h1>
          </div>
          <div className="footer_links">
            <div className="footer_link-pages">
              <h1 className="footer_link-page-title">Pages</h1>
              <Link to='/' className="footer_link-page-lists">Home</Link>
              <Link to='/all-products' className="footer_link-page-lists">Products</Link>
              <p className="footer_link-page-lists">Gifting</p>
              <Link to='/about' className="footer_link-page-lists">About</Link>
              <p className="footer_link-page-lists">Profile</p>
            </div>
            <div className="footer_link-quickLinks">
              <h1 className="footer_link-quickLinks-title">Quick Links</h1>
              <p className="footer_link-quickLinks-lists">Privacy Policy</p>
              <p className="footer_link-quickLinks-lists">Terms and Conditions</p>
              <p className="footer_link-quickLinks-lists">FAQs</p>
              <p className="footer_link-quickLinks-lists">Customer Services</p>
            </div>
            <div className="footer_link-contacts-and-socialMedia">
              <div className="footer_link-contacts">
                <div className="footer_link-contacts-mail">
                  <img src={mail} alt="" />
                  <p>ftrafurniture@gmail.com</p>
                </div>
                <div className="footer_link-contacts-phone">
                  <img src={phone} alt="" />
                  <p>+91 9876543210</p>
                </div>
              </div>
              <div className="footer_link-socialMedia">
                <h1>Social Media</h1>
                <div className="footer_link-socialMedia-icon">
                  <img src={instagram} alt="" />
                  <img src={facebook} alt="" />
                  <img src={twitter} alt="" />
                  <img src={youtube} alt="" />
                  <img src={linkedIn} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="footer_bottom">
          <div className="footer_bottom-legal-links">
            <p>Web Accessibility</p>|
            <p>Terms of Use</p>|
            <p>Privacy of Statement</p>|
            <p>Contact Us</p>
          </div>
          <div className="footer_bottom-copyrights">
            <p>© 2024 fragranzia Company. All rights reserved.</p>
          </div>

        </div>
      </div>

    </footer>
  )
}

export default Footer