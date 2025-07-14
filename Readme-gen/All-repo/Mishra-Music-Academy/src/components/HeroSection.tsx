import Link from "next/link";
import { Spotlight } from "../components/ui/Spotlght";
import { Button } from "../components/ui/moving-border";

function HeroSection() {
  return (
    <div className="">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="green"
      />
      <div className="p-6 md:p-12 relative z-10 w-full text-center">
        <h1 className="mt-20 md:mt-0 text-3xl md:text-6xl font-semibold text-white bg-clip-text bg-gradient-to-b from-pink-400 to-yellow-400 
                transition-all duration-700 hover:font-extrabold">
          Learn Music With Me Like Never Before!!
        </h1>
        <p className="font-semibold duration-700 mt-6 hover:scale-110 text-4xl transition-transform ease-in-out md:text-lg text-gray-300 max-w-2xl mx-auto">
          Discover the art of music through a unique and immersive experience.
          Whether a beginner or an advanced musician, our tailored courses will help you master the skills you need.
        </p>
        <p className="font-semibold duration-700 mt-4 hover:scale-110 text-4xl transition-transform ease-in-out md:text-lg text-gray-300 max-w-2xl mx-auto">
          I am a Programmer, Coder, Developer !!<br></br>
          What else ?? Musician, of course !!
        </p>
        <div className="mt-6">
          <Link href={"/courses"}>
            <Button
              borderRadius="1.75rem"
              className="font-semibold duration-700 hover:text-yellow-500 bg-white dark:bg-slate-600 text-black dark:text-white border-gray-200 dark:border-gray-800"
            >
              Explore Courses
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
