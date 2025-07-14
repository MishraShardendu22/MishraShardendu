'use client'
import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import courseData from "@/data/music_couses.json";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import { Button } from "@/components/ui/moving-border";
import { HoveredLink } from "@/components/ui/navbar-menu";

function Page() {

  return (
    <div className="min-h-screen bg-black py-12 pt-36">
        <ShootingStars />
        <StarsBackground />
        
        <div className="flex flex-col items-center mb-12">
          <h1 className="py-4 text-lg md:text-6xl font-sans font-bold text-white text-center">
            All courses ({courseData.courses.length})
          </h1>  
          <Button
            borderRadius="1.75rem"
            className="py-2 px-4 bg-white dark:bg-slate-900 text-white border-neutral-200 hover:bg-slate-300 duration-500 hover:text-yellow-600 dark:border-slate-800"
          >
            <HoveredLink className="duration-500 hover:text-yellow-600 font-bold text-xl" href="/">Home</HoveredLink>
          </Button>
        </div>
        <div className="flex flex-wrap justify-center">
            {courseData.courses.map((course) => (
                <CardContainer key={course.id} className="inter-var m-4">
                <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
                  <CardItem
                    translateZ="50"
                    className="text-xl font-bold text-neutral-600 dark:text-white"
                  >
                    {course.title}
                  </CardItem>
                  <CardItem
                    as="p"
                    translateZ="60"
                    className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                  >
                    {course.description}
                  </CardItem>
                  <CardItem translateZ="100" className="w-full mt-4">
                    <Image
                      src={course.image}
                      height={1000}
                      width={1000}
                      className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                      alt={course.title}
                    />
                  </CardItem>
                  <div className="flex justify-between items-center mt-20">
                    <CardItem
                      translateZ={20}
                      as="button"
                      className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
                    >
                      Try now →
                    </CardItem>
                    <CardItem
                      translateZ={20}
                      as="button"
                      className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                    >
                      Sign up
                    </CardItem>
                  </div>
                </CardBody>
              </CardContainer>
            ))}
        </div>
    </div>
  )
}

export default Page;
