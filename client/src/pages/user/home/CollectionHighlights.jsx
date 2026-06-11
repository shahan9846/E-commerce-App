import React from 'react'
import newArrival from '../../../assets/images/newArrival.png'
import limitedEdition from '../../../assets/images/limitedEdition.png'
import bestSeller from '../../../assets/images/bestSeller.png'

const CollectionHighlights = () => {
    return (
        <section>

            <article>
                <div className="collection-highlights_quote">
                    <h1 className='collection-highlights_quote-text'>"It's an art. A craft. A science. At Fragranzia, we're in <br /> the business of creating memories that last forever <br /> through our fragrances."</h1>
                </div>
            </article>

            <article>
                <div className="collection-highlights">
                    <div className="collection-highlights_card ">
                        <img className="collection-highlights_card-image " src={newArrival} alt='' />
                        <h1 className="collection-highlights_card-label">New Arrivals</h1>
                    </div>
                    <div className="collection-highlights_card">
                        <img className="collection-highlights_card-image " src={limitedEdition} alt='' />
                        <h1 className="collection-highlights_card-label">Limited Edition</h1>
                    </div>
                    <div className="collection-highlights_card">
                        <img className="collection-highlights_card-image " src={bestSeller} alt='' />
                        <h1 className="collection-highlights_card-label">Best Sellers</h1>
                    </div>
                </div>
            </article>
            
        </section>
    )
}

export default CollectionHighlights