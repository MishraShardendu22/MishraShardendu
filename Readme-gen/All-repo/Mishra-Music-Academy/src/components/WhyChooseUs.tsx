"use client";
import React from "react";
import { StickyScroll } from "../components/ui/sticky-scroll-reveal";
import course from "../data/music_couses.json";

export default function MusicCourses() {
  const courses = course.courses.filter((item: any) => item.id <= 6).map((item: any) => ({
    title: item.title,
    description: item.description,
    imageUrl: item.image,
  }));

  return (
    <div>
      <StickyScroll content={courses} />
    </div>
  );
}
