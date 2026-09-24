import React from 'react'
import HeroSection from '../components/HeroSection'
import Avert from '../components/Advert'
import HowToUseMarketLink from '../components/HowToUseMarketLink'
import Categories from '../components/Categories'
import FreshProduct from '../components/FreshProduct'
import WhyChooseUs from '../components/WhyChooseUs'
import AboutUsSection from '../components/AboutUsSection'

function Home() {
  return (
      <main>
          <HeroSection  />
          <HowToUseMarketLink/>
          <Categories />
          <FreshProduct />
          <AboutUsSection />
          <WhyChooseUs/>
          <Avert/>
    </main>
  )
}

export default Home