'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, Home, Lightbulb, Stars, Rocket, RefreshCcw } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import apiRequest from '@/util/apiRequest';
import Header from '@/components/Header';

const FACTS_PROMPT = 'Write 10 distinct facts about Social Media and Social Media well-being, formatted as an array of sentences. Each sentence should be a separate fact. Give them in the format of ["this is fact one", "this is fact two",] like this don\'t write anything else.';
const GEMINI_MODEL = 'gemini-1.5-flash';

// Floating star component for background animation
const FloatingStar = ({ delay = 0 }) => (
  <div 
    className="absolute animate-float opacity-50"
    style={{
      animationDelay: `${delay}s`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`
    }}
  >
    <Stars className="text-purple-300/30" size={Math.random() * 20 + 10} />
  </div>
);

const FactsSkeleton = () => (
  <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 text-center animate-pulse border border-purple-900/30">
    <div className="flex items-center justify-center gap-3 mb-4">
      <div className="w-6 h-6 bg-purple-900/60 rounded-full"></div>
      <div className="h-6 w-32 bg-purple-900/60 rounded"></div>
    </div>
    <div className="h-6 w-full bg-purple-900/60 rounded mb-2"></div>
    <div className="h-6 w-3/4 mx-auto bg-purple-900/60 rounded"></div>
  </div>
);

const NotFound = () => {
  const [isClient, setIsClient] = useState(false);
  const [factsResult, setFactsResult] = useState<{
    success: boolean;
    data?: string[];
    error?: string;
  }>({ success: false });
  const [isLoading, setIsLoading] = useState(true);
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const apiKeyRef = useRef<string>('');
  const [showRocket, setShowRocket] = useState(false);

  useEffect(() => {
    const fetchAPIKey = async () => {
      try {
        const res = await apiRequest.get('/ai');
        if (res.status === 200 && res.data?.data) {
          apiKeyRef.current = res.data.data;
          fetchFacts();
        } else {
          throw new Error('Invalid API key response');
        }
      } catch (error) {
        console.error('Error fetching API key:', error);
        setIsLoading(false);
      }
    };

    const fetchFacts = async () => {
      if (!apiKeyRef.current) {
        setFactsResult({ success: false, error: 'API configuration error' });
        setIsLoading(false);
        return;
      }

      try {
        const genAI = new GoogleGenerativeAI(apiKeyRef.current);
        const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });

        const chatSession = model.startChat({
          generationConfig: {
            temperature: 0.7,
            topP: 0.9,
            maxOutputTokens: 8192,
          },
        });

        const result = await chatSession.sendMessage(FACTS_PROMPT);
        const responseText = await result.response.text();

        try {
          const parsedFacts = JSON.parse(responseText);
          if (!Array.isArray(parsedFacts)) throw new Error('Invalid response format');
          setFactsResult({ success: true, data: parsedFacts });
        } catch (parseError) {
          console.error('Error parsing facts:', parseError);
          setFactsResult({ success: false, error: 'Could not parse facts' });
        }
      } catch (error) {
        console.error('Error fetching facts:', error);
        setFactsResult({ success: false, error: 'Failed to fetch facts' });
      } finally {
        setIsLoading(false);
      }
    };

    fetchAPIKey();
    setIsClient(true);
    
    // Show rocket animation after a delay
    setTimeout(() => setShowRocket(true), 1000);
  }, []);

  const nextFact = () => {
    if (factsResult.data) {
      setCurrentFactIndex((prev) => (prev + 1) % factsResult.data!.length);
    }
  };

  if (!isClient) return null;

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-black to-indigo-950 overflow-hidden relative">
        {/* Animated background stars */}
        {[...Array(20)].map((_, i) => (
          <FloatingStar key={i} delay={i * 0.5} />
        ))}

        <main className="container mx-auto px-4 py-8 relative z-10">
          <section className="mb-8 text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-purple-200 md:text-5xl lg:text-6xl">
              Cosmic Expedition Interrupted
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-purple-300">
              Your spacecraft has drifted beyond the charted coordinates
            </p>
          </section>

          <div className="mx-auto max-w-3xl relative">
            {/* Giant 404 text in background */}
            <h2 className="text-[10rem] md:text-[16rem] font-black text-purple-900/20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 select-none animate-pulse" aria-hidden="true">
              404
            </h2>
            
            {/* Animated rocket */}
            <div className={`absolute top-1/4 transition-all duration-1000 ${showRocket ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'}`}>
              <Rocket className="text-purple-300 animate-pulse" size={48} />
            </div>

            <div className="bg-black/40 backdrop-blur-sm rounded-xl p-8 border border-purple-900/30 text-center relative">
              <p className="text-xl text-purple-200 max-w-xl mx-auto mb-8">
                The destination remains uncharted in this corner of the digital universe.
              </p>

              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <button
                  onClick={() => window.history.back()}
                  className="flex items-center gap-2 px-6 py-3 bg-purple-900/60 text-purple-200 rounded-xl hover:bg-purple-800 transition duration-300 group border border-purple-700/50"
                  aria-label="Go Back"
                >
                  <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                  Reverse Trajectory
                </button>

                <Link
                  href="/"
                  className="flex items-center gap-2 px-6 py-3 bg-black/40 text-purple-200 rounded-xl hover:bg-purple-900/30 transition duration-300 group border border-purple-900/30"
                  aria-label="Go to Home"
                >
                  <Home size={20} className="group-hover:rotate-12 transition-transform" />
                  Mission Control
                </Link>
              </div>

              {isLoading ? (
                <FactsSkeleton />
              ) : factsResult.data ? (
                <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 text-center transform hover:scale-105 transition-transform border border-purple-900/30">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <Lightbulb className="text-purple-300 animate-pulse" size={24} />
                    <h3 className="text-2xl font-semibold text-purple-200">
                      Cosmic Trivia
                    </h3>
                  </div>
                  <p className="text-xl text-purple-200 font-medium mb-4">
                    {factsResult.data[currentFactIndex]}
                  </p>
                  <button
                    onClick={nextFact}
                    className="flex items-center gap-2 mx-auto px-4 py-2 bg-purple-900/30 rounded-lg hover:bg-purple-900/50 transition-colors text-purple-200 border border-purple-900/30"
                  >
                    <RefreshCcw size={16} />
                    Next Fact
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default NotFound;