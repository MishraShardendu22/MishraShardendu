"use client";
import Link from "next/link";
import { ToastContainer, toast } from 'react-toastify';
import { Play, Image as ImageIcon, Crop } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const notify = () => toast("Feature coming soon!");

  return (
    <div className="bg-gradient-to-b from-indigo-900 to-violet-800 min-h-screen p-8 flex flex-col">
      <header className="text-center text-slate-300 text-xl mb-12">
        <h1 className="text-black text-5xl font-bold mb-4 transition duration-300 ease-in-out hover:scale-105">Welcome to the Media Enhancement App</h1>
        <p className="mt-4 text-black underline-offset-2  text-xl max-w-2xl mx-auto transition duration-300 ease-in-out hover:scale-105">
          Enhance your media with Cloudinary AI. Upload videos and images, compress them, and crop for social media formats!
        </p>
      </header>

      <main className="flex-grow flex flex-col items-center gap-12">
        <section className="w-full max-w-4xl">
          <h2 className="text-black underline-offset-2  text-xl mb-6 text-center">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Play, title: "Video Enhancement", description: "Compress and enhance videos using Cloudinary AI" },
              { icon: ImageIcon, title: "Image Focus", description: "Focus on key areas with AI technology" },
              { icon: Crop, title: "Smart Cropping", description: "Crop images for specific social media formats" }
            ].map((feature, index) => (
              <Card key={index} className="bg-gray-700 text-slate-300 text-xl border-none hover:bg-gray-600 transition">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <feature.icon className="w-6 h-6" />
                    <span className="text-black">{feature.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="w-full max-w-2xl">
          <h2 className="text-black underline-offset-2  text-xl mb-6 text-center">Upload Your Media</h2>
          <div className="flex gap-4 justify-center flex-wrap">
            {["Home", "Social Share", "Video Upload"].map((label, index) => (
              <Button
                key={index}
                className="w-full sm:w-auto bg-gray-600 text-slate-300 text-xl hover:bg-gray-500 transition"
              >
                <Link href={`/${label.toLowerCase().replace(" ","-")}`} onClick={notify} className="transition duration-700 ease-in-out hover:scale-105">
                  {label}
                </Link>
              </Button>
            ))}
          </div>
        </section>

        <section className="w-full max-w-4xl text-center">
          <h2 className="text-black underline-offset-2  text-xl mb-4">How It Works</h2>
          <Card className="bg-gray-700 text-slate-300 text-xl border-none">
            <CardContent className="pt-6">
              <p className="text-xl mb-4">
                Our application leverages <strong className="text-black">Cloudinary AI</strong> to process your uploaded media efficiently. You can select specific focus areas for your images, ensuring that the most important parts are highlighted.
              </p>
              <p className="text-xl">
                Videos are automatically compressed and enhanced, improving quality without increasing file size. Experience seamless media enhancement like never before!
              </p>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="text-slate-300 text-xl text-center mt-12">
        <p>&copy; 2024 Cloudinary SaaS. All rights reserved.</p>
        <ToastContainer />
      </footer>
    </div>
  );
}
