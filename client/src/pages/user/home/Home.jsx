import React from 'react'
import Banner from './Banner'
import FeaturedCollections from './FeaturedCollections'
import CollectionHighlights from './CollectionHighlights'
import ExploreCategories from './ExploreCategories'
import OfferZone from './OfferZone'
import FooterBanner from './FooterBanner'

const Home = () => {


  return (
    <section>
      <Banner />
      <FeaturedCollections />
      <CollectionHighlights />
      {/* <ExploreCategories /> */}
      <OfferZone />
      <FooterBanner />
    </section>
  )
}

export default Home