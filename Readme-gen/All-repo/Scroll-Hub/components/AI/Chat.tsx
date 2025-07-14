/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Loader2,
  SendHorizontal,
  MessageCircle,
  CircleX,
  CheckCircle2,
  UserCircle,
  Bot,
} from 'lucide-react';
import toast from 'react-hot-toast';
import apiRequest from '@/util/apiRequest';
import Header from '../Header';

const Chat = () => {
  const apiKeyRef = useRef<string>('');
  const [genAI, setGenAI] = useState<GoogleGenerativeAI | null>(null);
  const [model, setModel] = useState<any>(null);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [chat, setChat] = useState<{
    id: number;
    type: 'user' | 'ai';
    message: string;
  }[]>([]);

  useEffect(() => {
    const fetchApiKey = async () => {
      const res = await apiRequest.get('/ai');
      if (res.status === 200 && res.data.data) {
        apiKeyRef.current = res.data.data;
        const newGenAI = new GoogleGenerativeAI(apiKeyRef.current);
        setGenAI(newGenAI);
        setModel(newGenAI.getGenerativeModel({ model: 'gemini-2.0-flash' }));
      }
    };
    fetchApiKey();
  }, []);

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: 'text/plain',
  };

  const scrollRef = useRef<HTMLDivElement>(null);

  const chatSession = useMemo(() => {
    if (model) {
      return model.startChat({
        generationConfig,
        history: [],
      });
    }
    return null;
  }, [model]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chat]);

  const handleSubmit = async () => {
    if (!prompt.trim() || !chatSession) return;

    const userMessage = {
      id: Date.now(),
      type: 'user' as const,
      message: prompt,
    };

    setChat((prev) => [...prev, userMessage]);
    setLoading(true);

    const modifiedPrompt = `${prompt},${process.env.NEXT_PUBLIC_SPECIAL_PROMPT}`;

    try {
      const result = await chatSession.sendMessage(modifiedPrompt);
      const aiMessage = {
        id: Date.now(),
        type: 'ai' as const,
        message: result.response.text(),
      };
      setChat((prev) => [...prev, aiMessage]);
      setPrompt('');
      toast.success('Message sent successfully', {
        icon: <CheckCircle2 className="text-purple-400" />,
        style: {
          borderRadius: '10px',
          background: '#1a1a1a',
          color: '#d1d1d1',
          border: '1px solid rgba(139, 92, 246, 0.3)',
        },
      });
    } catch (error) {
      console.error('Error fetching chat response:', error);
      const errorMessage = {
        id: Date.now(),
        type: 'ai' as const,
        message: 'Sorry, there was an error processing your request.',
      };
      setChat((prev) => [...prev, errorMessage]);
      toast.error('Failed to send message', {
        icon: <CircleX />,
        style: {
          borderRadius: '10px',
          background: '#1a1a1a',
          color: '#ff4b4b',
          border: '1px solid rgba(239, 68, 68, 0.3)',
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !loading) {
      handleSubmit();
    }
  };

  const clearChat = () => {
    setChat([]);
    toast.success('Chat cleared', {
      style: {
        borderRadius: '10px',
        background: '#1a1a1a',
        color: '#d1d1d1',
        border: '1px solid rgba(139, 92, 246, 0.3)',
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-indigo-950">
      <Header />
      <div className="max-w-xl mx-auto pt-8 p-4">
        <Card className="bg-black/40 backdrop-blur-sm border-purple-900/50 shadow-2xl">
          <CardHeader className="border-b border-purple-900/30 flex flex-row items-center justify-between bg-black/60">
            <div className="flex items-center space-x-2">
              <MessageCircle className="text-purple-400" />
              <CardTitle className="text-purple-200">Scroll-Hub AI</CardTitle>
            </div>
            {chat.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearChat}
                className="text-purple-300 hover:text-purple-100 hover:bg-purple-900/30"
              >
                Clear Chat
              </Button>
            )}
          </CardHeader>
          <CardContent className="p-4">
            <div
              ref={scrollRef}
              className="h-[400px] overflow-y-auto pr-2 space-y-4 scrollbar-thin scrollbar-track-purple-900/20 scrollbar-thumb-purple-600/50"
            >
              <AnimatePresence>
                {chat.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: item.type === 'user' ? 50 : -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, type: 'spring', stiffness: 100 }}
                    className={`flex items-center ${
                      item.type === 'user' ? 'justify-end' : 'justify-start'
                    } space-x-2`}
                  >
                    {item.type === 'ai' && (
                      <Bot className="text-purple-400 h-5 w-5" />
                    )}
                    <div
                      className={`
                        p-3 rounded-xl max-w-[80%] shadow-sm
                        ${
                          item.type === 'user'
                            ? 'bg-purple-900/30 text-purple-200'
                            : 'bg-black/60 text-purple-300'
                        }
                      `}
                    >
                      {item.message}
                    </div>
                    {item.type === 'user' && (
                      <UserCircle className="text-purple-400 h-5 w-5" />
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            <div className="mt-4 flex space-x-2">
              <Input
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about social media wellness..."
                disabled={loading}
                className="flex-grow bg-black/60 border-purple-900/30 text-purple-200 placeholder-purple-400/50 focus:border-purple-500"
              />
              <Button
                onClick={handleSubmit}
                disabled={loading || !prompt.trim()}
                className="bg-purple-900/80 hover:bg-purple-800 text-purple-200"
              >
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <SendHorizontal className="mr-2 h-4 w-4" />
                )}
                Send
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Chat;