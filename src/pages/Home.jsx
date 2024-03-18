import React from 'react'
import Banner from '../components/Banner'
import Categories from './Categories'
import SpecialDishes from './SpecialDishes'
import Tastimonials from './Tastimonials'
import Service from './Service'

const Home = () => {
  return (
    <div>
      <Banner/>
      <Categories/>
      <SpecialDishes/>
      <Tastimonials />
      <Service/>
    </div>
  )
}

export default Home