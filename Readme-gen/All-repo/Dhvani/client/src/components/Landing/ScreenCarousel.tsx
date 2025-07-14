import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Monitor, Pause, Play } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useThemeStore } from "@/store/themeStore";

const ICUScreenCarousel: React.FC = () => {
    const { theme } = useThemeStore();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlay, setIsAutoPlay] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    const screens = [
        {
            image: "/blood-request-page.png",
            title: "Blood Request System",
            description: "Real-time blood availability tracking"
        },
        {
            image: "/hospital-dhvani-page.png",
            title: "Hospital Dashboard",
            description: "Comprehensive patient management"
        },
        {
            image: "/tb-report-page.png",
            title: "TB Analysis Report",
            description: "AI-powered diagnostic insights"
        },
        {
            image: "/dark-mode-page.png",
            title: "Dark Mode Interface",
            description: "Enhanced visibility for night shifts"
        },
    ];

    // Auto-play functionality
    useEffect(() => {
        if (!isAutoPlay) return;
        
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % screens.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [isAutoPlay, screens.length]);

    // Simulate loading
    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    const prevImage = () => {
        setCurrentIndex((prev) => 
            prev - 1 < 0 ? screens.length - 1 : prev - 1
        );
    };

    const nextImage = () => {
        setCurrentIndex((prev) => 
            (prev + 1) % screens.length
        );
    };

    const toggleAutoPlay = () => {
        setIsAutoPlay(!isAutoPlay);
    };

    return (
        <div className="relative w-full max-w-2xl mx-auto">
            {/* Monitor Frame */}
            <Card className={`relative overflow-hidden backdrop-blur-sm border-2 shadow-2xl ${
                theme === "light"
                    ? "bg-gradient-to-br from-slate-100/90 to-white/90 border-slate-300/50"
                    : "bg-gradient-to-br from-slate-800/90 to-slate-900/90 border-slate-600/50"
            }`}>
                {/* Monitor Header */}
                <div className={`flex items-center justify-between px-6 py-4 border-b ${
                    theme === "light" 
                        ? "bg-slate-50/80 border-slate-200" 
                        : "bg-slate-800/80 border-slate-700"
                }`}>
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                            theme === "light" 
                                ? "bg-red-100 text-red-600" 
                                : "bg-red-500/20 text-red-400"
                        }`}>
                            <Monitor className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className={`font-semibold text-lg ${
                                theme === "light" ? "text-slate-900" : "text-white"
                            }`}>
                                Healthcare Monitor
                            </h3>
                            <p className={`text-sm ${
                                theme === "light" ? "text-slate-500" : "text-slate-400"
                            }`}>
                                {screens[currentIndex].title}
                            </p>
                        </div>
                    </div>

                    {/* Status Indicators */}
                    <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        </div>
                    </div>
                </div>

                {/* Screen Content */}
                <CardContent className="p-0 relative h-[400px] md:h-[300px] overflow-hidden">
                    {/* Loading State */}
                    {isLoading && (
                        <div className={`absolute inset-0 flex items-center justify-center z-20 ${
                            theme === "light" ? "bg-white/90" : "bg-slate-900/90"
                        }`}>
                            <div className="flex flex-col items-center gap-4">
                                <div className="relative">
                                    <div className="w-12 h-12 border-4 border-red-200 rounded-full animate-spin border-t-red-500"></div>
                                </div>
                                <p className={`text-sm font-medium ${
                                    theme === "light" ? "text-slate-600" : "text-slate-300"
                                }`}>
                                    Loading monitor...
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Image Container */}
                    <div className={`relative w-full h-full ${
                        theme === "light" ? "bg-slate-100" : "bg-slate-900"
                    }`}>
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={currentIndex}
                                src={screens[currentIndex].image}
                                alt={screens[currentIndex].title}
                                className="object-contain w-full h-full"
                                initial={{ opacity: 0, scale: 0.05 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                onLoad={() => setIsLoading(false)}
                            />
                        </AnimatePresence>

                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

                        {/* Navigation Controls */}
                        <div className="absolute inset-0 flex items-center justify-between px-4 transition-opacity duration-300 opacity-0 hover:opacity-100">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={prevImage}
                                className={`backdrop-blur-sm border-2 shadow-lg hover:scale-110 transition-all duration-200 ${
                                    theme === "light"
                                        ? "bg-white/90 hover:bg-white border-white/50 text-slate-700"
                                        : "bg-slate-800/90 hover:bg-slate-700 border-slate-600/50 text-white"
                                }`}
                                aria-label="Previous Image"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={nextImage}
                                className={`backdrop-blur-sm border-2 shadow-lg hover:scale-110 transition-all duration-200 ${
                                    theme === "light"
                                        ? "bg-white/90 hover:bg-white border-white/50 text-slate-700"
                                        : "bg-slate-800/90 hover:bg-slate-700 border-slate-600/50 text-white"
                                }`}
                                aria-label="Next Image"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </Button>
                        </div>
                    </div>

                    {/* Bottom Overlay with Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                        <div className="flex items-end justify-between">
                            <div className="text-white">
                                <h4 className="mb-1 text-lg font-semibold">
                                    {screens[currentIndex].title}
                                </h4>
                                <p className="text-sm text-white/80">
                                    {screens[currentIndex].description}
                                </p>
                            </div>

                            {/* Auto-play Control */}
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={toggleAutoPlay}
                                className="text-white backdrop-blur-sm bg-white/20 hover:bg-white/30 border-white/30"
                            >
                                {isAutoPlay ? (
                                    <Pause className="w-4 h-4" />
                                ) : (
                                    <Play className="w-4 h-4" />
                                )}
                            </Button>
                        </div>
                    </div>
                </CardContent>

                {/* Progress Indicators */}
                <div className={`flex items-center justify-between px-6 py-4 border-t ${
                    theme === "light" 
                        ? "bg-slate-50/80 border-slate-200" 
                        : "bg-slate-800/80 border-slate-700"
                }`}>
                    <div className="flex gap-2">
                        {screens.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`relative w-8 h-2 rounded-full transition-all duration-300 ${
                                    index === currentIndex
                                        ? "bg-red-500 scale-110"
                                        : theme === "light"
                                            ? "bg-slate-300 hover:bg-slate-400"
                                            : "bg-slate-600 hover:bg-slate-500"
                                }`}
                            >
                                {/* Progress Bar for Current Item */}
                                {index === currentIndex && isAutoPlay && (
                                    <motion.div
                                        className="absolute inset-0 bg-red-300 rounded-full"
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: 1 }}
                                        transition={{ duration: 4, ease: "linear" }}
                                        style={{ originX: 0 }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>

                    <div className={`text-sm font-medium ${
                        theme === "light" ? "text-slate-600" : "text-slate-400"
                    }`}>
                        {currentIndex + 1} / {screens.length}
                    </div>
                </div>
            </Card>

            {/* Floating Action Hints */}
            <div className="absolute transform -translate-x-1/2 -bottom-12 left-1/2">
                <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs ${
                    theme === "light"
                        ? "bg-white/80 text-slate-600 border border-slate-200"
                        : "bg-slate-800/80 text-slate-300 border border-slate-600"
                }`}>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>Live Healthcare Dashboard</span>
                </div>
            </div>
        </div>
    );
};

export default ICUScreenCarousel;