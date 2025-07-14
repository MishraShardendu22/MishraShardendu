/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { motion } from "framer-motion";
import { Card as UICard, CardContent } from "@/components/ui/card";
import { BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import { Button } from "@/components/ui/button";
import axios from "axios";

const GenreCard = ({ title, onClick, delay }: { title: string; onClick: () => void; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="w-full"
  >
    <UICard
      className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-800 hover:border-gray-700 
                  transition-all duration-300 overflow-hidden group cursor-pointer hover:shadow-lg
                  hover:shadow-blue-500/10 hover:-translate-y-1"
      onClick={onClick}
    >
      <CardContent className="p-6 flex items-center space-x-4 relative">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-500"
        >
          <BookOpen className="w-6 h-6 text-white" />
        </motion.div>
        <span className="text-lg md:text-xl font-semibold text-white capitalize flex-grow">
          {title.replace(/-/g, ' ').replace('/science', '')}
        </span>
        <div className="absolute bottom-0 left-0 right-0">
          <motion.div
            className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
          />
        </div>
      </CardContent>
    </UICard>
  </motion.div>
);

const SelectNews = () => {
  const navigate = useNavigate();
  const genres = [
    "sci-tech/science",
    "life-and-style",
    "sport",
    "entertainment",
    "business",
    "news"
  ];
  const [selectedGenre, setSelectedGenre] = useState<string>("");

  const GetData = async () => {
    console.log("Getting data for:", selectedGenre);
    try {
      const response = await axios.post("http://127.0.0.1:3000/getLink", {
        url: `https://www.thehindu.com/${selectedGenre}/feeder/default.rss`,
      });
      
      const csvData = response.data; // Assuming this is your CSV data
      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', 'data.csv'); // Set the desired file name
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };
  

  const handleGenreSelect = (genre: string) => {
    setSelectedGenre(genre);

    // Custom toast component with confirmation buttons
    toast.custom(
      (t) => (
        <div className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-md w-full bg-gray-900 shadow-lg rounded-lg pointer-events-auto flex flex-col ring-1 ring-black ring-opacity-5`}>
          <div className="p-4">
            <div className="flex items-start">
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-100">
                  Confirm Selection
                </p>
                <p className="mt-1 text-sm text-gray-400">
                  Would you like to get data for {genre.replace(/-/g, ' ').replace('/science', '')}?
                </p>
                <div className="mt-4 flex space-x-4">
                  <Button
                    variant="default"
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                    onClick={() => {
                      toast.dismiss(t.id);
                      GetData();
                      navigate('/DownloadData');
                    }}
                  >
                    Yes, Continue
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => { toast.dismiss(t.id); setSelectedGenre(""); }}
                    className="border-gray-700 text-gray-300 hover:bg-gray-800"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      {
        duration: 5000,
        position: 'top-right', // Position toast at the top-right
      }
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 flex items-center justify-center pb-24">
      <Toaster />
      <div className="container mx-auto max-w-5xl px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
              Select Your News Genre
            </span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            Choose a category to Scrape and get NEWS data
          </p>
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl mx-auto"
        >
          {genres.map((genre, idx) => (
            <GenreCard
              key={idx}
              title={genre}
              delay={idx * 0.1}
              onClick={() => handleGenreSelect(genre)}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default SelectNews;
