'use client';
import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
 const [theme, setTheme] = useState<'light' | 'dark'>('light');

 useEffect(() => {
  const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
  if (storedTheme) {
   setTheme(storedTheme);
   document.documentElement.classList.toggle('dark', storedTheme === 'dark');
  }
 }, []);

 const toggleTheme = () => {
  const newTheme = theme === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
  localStorage.setItem('theme', newTheme);
  document.documentElement.classList.toggle('dark', newTheme === 'dark');
 };

 return (
  <button
   onClick={toggleTheme}
   className="p-2 bg-gray-200 dark:bg-gray-800 rounded-lg transition"
  >
   {theme === 'dark' ? (
    <Sun className="w-5 h-5" />
   ) : (
    <Moon className="w-5 h-5" />
   )}
  </button>
 );
};

export default ThemeToggle;
