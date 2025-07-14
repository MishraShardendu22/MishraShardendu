import React from 'react'
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturedCourses from "@/components/FeaturedCourses";
import WhyChooseUs from "@/components/WhyChooseUs"
import Testimonial from "@/components/Testimonial"
import Instructors from "@/components/Instructors"
import Footer from "@/components/Footer"


function page() {
  return (
    <div>
      <div className="my-24"><Navbar/></div>
        <div className="my-24"><HeroSection/></div>
        <div className="my-24"><FeaturedCourses/></div>
        <div className="my-24"><WhyChooseUs/></div>
        <div className="my-24"><Testimonial/></div>
        <div className="mb-12"><Instructors/></div>
        <div className="mb-24"><Footer/></div>
    </div>
  )
}

export default page