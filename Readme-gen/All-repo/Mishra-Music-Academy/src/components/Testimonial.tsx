"use client";
import React, { useEffect, useState } from "react";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";

const musicSchoolTestimonials = [
    {
      quote:
        'Joining the music academy has deepened my understanding of classical music and helped me connect with my roots. The gurus here are exceptional!',
      name: 'Aarav Sharma',
      title: 'Sitar Student',
    },
    {
      quote:
        'The sense of community and support at this academy is unparalleled. I have grown not just as a tabla player, but also as a performer, thanks to their holistic approach.',
      name: 'Priya Iyer',
      title: 'Tabla Student',
    },
    {
      quote:
        'This academy provided me with the tools and confidence to excel in Hindustani classical vocals. I am immensely grateful for the personalized guidance.',
      name: 'Rohan Singh',
      title: 'Vocal Student',
    },
    {
      quote:
        'As a violinist focused on Carnatic music, finding the right guru was crucial. This academy connected me with a teacher who truly understands my goals and challenges.',
      name: 'Meera Nair',
      title: 'Carnatic Violin Student',
    },
    {
      quote:
        'The music production courses here gave me insights into the nuances of Indian classical music production. Highly recommended for aspiring music producers!',
      name: 'Kabir Patel',
      title: 'Music Production Student',
    },
  ];
  

function Testimonial() {
    return (
      <div className="h-[50rem] w-full dark:bg-black bg-white dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
            <div>
                <InfiniteMovingCards
                    items={musicSchoolTestimonials}
                    direction="right"
                    speed="slow"
                />
            </div>
        </div>
    );
}
  
export default Testimonial;
