import React from 'react'
import rightArrow from '../../../assets/images/rightArrow.png'
import aboutImg1 from '../../../assets/images/aboutImg1.png'
import aboutImg2 from '../../../assets/images/aboutImg2.png'
import { Link } from 'react-router-dom'
const AboutPage = () => {
  return (
    <>
      <div className="about_page">
        <div className="about_page-text">
          <div className="about_page-heading">
            <h1 className="about_page-title">About Fragraniza</h1>
            <h6 className='about_page-nav_links'><Link to='/'>Home</Link><img src={rightArrow} alt="" /> About</h6>
          </div>
          <h6 className="about_page-description">At Fragranzia, we believe that a perfume is more than just a scent—it's a story, an art, and a science combined to create memories that linger. Our journey began with a vision to craft exquisite fragrances that capture the essence of individuality and elevate every moment into something timeless. <br /> <br />
            Guided by passion and precision, we source the finest ingredients from around the world to create perfumes that resonate with authenticity and luxury. Each bottle is a masterpiece, meticulously crafted to deliver an unparalleled sensory experience. <br /> <br />
            Our commitment goes beyond creating fragrances. We aim to inspire confidence, evoke emotions, and celebrate uniqueness through every drop we produce. Fragranzia isn’t just a brand—it’s a celebration of you, your style, and your moments. <br />  <br />
            With a legacy built on quality, artistry, and innovation, we invite you to explore our collection and find a scent that speaks your story.</h6>
        </div>
        <div className="about_page-images">
          <div className="about_page-top_image">
            <img src={aboutImg2} alt="" />
          </div>
          <div className="about_page-bottom_image">
            <img src={aboutImg1} alt="" />
          </div>
        </div>
      </div>
    </>
  )
}

export default AboutPage