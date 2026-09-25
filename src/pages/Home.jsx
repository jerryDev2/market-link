import React from 'react'
import HeroSection from "../components/HeroSection"
import HowToUseMarketLink from "../components/HowToUseMarketLink";
import Categories from "../components/Categories";
import FreshProduct from "../components/FreshProduct";
import WhyChooseUs from "../components/WhyChooseUs";
import AboutUsSection from '../components/AboutUsSection';
import Avert from '../components/Advert';





function Home() {
  return (
    <div>
      <HeroSection />
      <HowToUseMarketLink />
      <Categories />
      <FreshProduct />
      <AboutUsSection />
      <WhyChooseUs />
      <Avert/>
    </div>
  )
}

export default Home
