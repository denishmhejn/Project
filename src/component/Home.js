import React from 'react'
import Navbar from './navBar'
import Banner from './Banner'
import AdLayout from './AdLayout'
import CollegeGrid from './CollegeGrid'
import Recent from './Recent'
import ProgramOffered from './ProgramOffered'
import Footer from './Footer'
import FeatureCourses from './FeatureCourses'

const Home = () => {
  return (
    <div>
                <Navbar />
                <Banner />
                <AdLayout />
                <CollegeGrid />
                <Recent/>
                <FeatureCourses />
                <ProgramOffered />
                <Footer />
               
    </div>
  )
}   

export default Home
