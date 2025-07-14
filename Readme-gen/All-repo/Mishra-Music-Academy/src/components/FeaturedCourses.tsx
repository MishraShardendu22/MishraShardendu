"use client";
import React from "react";
import { BackgroundGradient } from "../components/ui/background-gradient"
import Link from "next/link";
import courseData from "../data/music_couses.json"
import { Button } from "./ui/moving-border";


interface Course{
    "id": number,
    "title": string,
    "slug": string,
    "description": string,
    "price": number,
    "instructor": string,
    "isFeatured": boolean
}

function FeaturedCourses() { 
    const featuredcourses = courseData.courses.filter((course : Course) => course.isFeatured)
    
    return (
        <div className="bg-slate-900  rounded-lg py-10">
            <div className="bg-gray-800 text-center p-8 rounded-lg shadow-lg">
                <h1 className="text-4xl font-extrabold text-white mb-4 uppercase">Featured Contest</h1>
                <p className="text-xl font-light text-gray-300">Learn With The Best</p>
            </div><br/>
            <div className="py-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
                {featuredcourses.map((course: Course) => (
                    <div
                    key={course.id}
                    className="flex justify-center"
                    >
                    <BackgroundGradient
                        className="flex flex-col rounded-2xl bg-white dark:bg-zinc-800 shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out overflow-hidden h-full max-w-sm border border-neutral-400 dark:border-neutral-600 hover:border-neutral-600"
                    >
                        <div className="p-6 flex flex-col items-center text-center flex-grow">
                        <p className="text-2xl italic font-semibold text-cream-100 dark:text-cream-300 mt-4 mb-2 underline">
                            {course.title}
                        </p>
                        <p className="p-2 text-base font-medium text-neutral-600 dark:text-neutral-400 mb-4 flex-grow">
                            {course.description}
                        </p>
                        <Link
                            className="inline-block px-6 py-3 rounded-full bg-yellow-500 text-white text-lg font-semibold hover:bg-yellow-600 transition-colors duration-300 ease-in-out"
                            href={`/courses/${course.slug}`}
                        >
                            Learn More
                        </Link>
                        </div>
                    </BackgroundGradient>
                    </div>
                ))}
                </div>
                <div className="flex justify-center">
                    <Button 
                        borderRadius="1.75rem" 
                        className="py-3 px-6 rounded-2xl border text-violet-500 flex items-center justify-center text-lg font-bold bg-transparent transition ease-in-out shadow-lg hover:shadow-xl hover:bg-slate-50 duration-700">
                        <Link href={"/courses"}>
                        View All Courses
                        </Link>
                    </Button>
                </div>

        </div>
    )
}

export default FeaturedCourses;
