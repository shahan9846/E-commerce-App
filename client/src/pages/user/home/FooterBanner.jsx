import React from 'react'
import bannerImg from '../../../assets/images/bannerImg.png'

const FooterBanner = () => {
    return (
        <section>
            <div className="footer-banner">
                <div className="footer-zone_item">
                    <article>

                        <div className="footer-banner_text">
                            <h1 className="footer-banner_title">Elegance in Every Bottle</h1>
                            <p className="footer-banner_description">Discover timeless fragrances crafted for every moment</p>
                            <button className="footer-banner_button">Shop Now</button>
                        </div>
                    </article>
                    
                    <article>

                        <div className="footer-banner_image">
                            <img src={bannerImg} alt="" />
                        </div>
                    </article>

                </div>
            </div>
        </section>
    )
}

export default FooterBanner