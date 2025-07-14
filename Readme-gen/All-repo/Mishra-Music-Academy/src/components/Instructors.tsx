"use client";
import { WavyBackground } from "./ui/wavy-background";
import { AnimatedTooltip } from "./ui/animated-tooltip";

const people = [
  {
    id: 1,
    name: "Shardendu Mishra",
    designation: "Coder",
    image:
      "https://avatars.githubusercontent.com/u/175409658?v=4",
  },
  {
    id: 2,
    name: "Mishra Shardendu",
    designation: "Programmer",
    image:
      "https://avatars.githubusercontent.com/u/152168607?s=400&u=a373f570c2ce33c2d807baaec187d073183d8f6f&v=4",
  },
  {
    id: 3,
    name: "Mishra Ji",
    designation: "Engineer",
    image:
      "https://media.licdn.com/dms/image/v2/D5603AQHItZDG5abfig/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1722102820976?e=1730937600&v=beta&t=QBAYcqozrF_VC9_BaBAGduvM-te1b8jTrPDessv46JA",
  },
];

export default function Instructors() {
  return (
    <div className="relative overflow-hidden">
        <WavyBackground className="flex flex-col items-center justify-center h-[100vh]">
            <div className="text-center text-white px-4 md:px-8">
            <h1 className="duration-500 hover:text-yellow-500 underline text-5xl md:text-7xl font-bold mb-4">
                Meet Our Instructors
            </h1>
            <p className="pt-4 duration-500 text-2xl my-4 border-solid border-black rounded-md text-slate-300 hover:scale-110 font-extrabold transition-transform ease-in-out">
                This course will be guided to you by our great course instructors!<br/>
                With years of experience, they are here to support and guide you through every step of your learning journey.<br/>
            </p>
            <p className="pt-4 duration-500 text-2xl my-4 border-solid border-black rounded-md text-slate-300 hover:scale-110 font-extrabold transition-transform ease-in-out">
                Expect engaging lessons, personalized feedback, and a wealth of knowledge.<br/>
                We are committed to your success and are excited to have you in our program!
            </p>
            <div className="flex justify-center mt-8">
                <AnimatedTooltip items={people} />
            </div>
            </div>
        </WavyBackground>
    </div>
  );
}
