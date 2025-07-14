import React from 'react';
import { Github, Linkedin, Heart, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const Footer = () => {
  return (
    <footer className="w-full bg-slate-950 border-t border-slate-800 py-6 px-2 relative overflow-hidden flex-shrink-0">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-pink-900/20 opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-t from-purple-500/5 to-transparent" />
      <div className="container mx-auto max-w-6xl relative">
        <div className="flex flex-col items-center gap-6">

          <div className="flex items-center gap-6">

            <div className="group relative flex flex-col items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text group-hover:from-purple-300 group-hover:to-pink-300 transition-all duration-300">
                PurrFection
              </span>
              <span className="text-sm pt-2 text-slate-400">
                The Perfect IDE
              </span>
              <div
                className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg opacity-0 group-hover:opacity-30 blur-lg transition-all duration-300"
              />
            </div>

            <Separator orientation="vertical" className="h-8 bg-slate-700" />

            <div className="flex flex-col items-center">
              <Button
                variant="ghost"
                size="lg"
                asChild
                className="relative group bg-slate-900/10 hover:bg-slate-800/50 text-slate-300 hover:text-purple-300 transition-all duration-300"
              >
                <a
                  href="https://github.com/MishraShardendu22"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3"
                >
                  <Github className="w-5 h-5" />
                  <span>GitHub</span>
                  <div className="absolute -inset-1 bg-purple-500/20 rounded-lg opacity-0 group-hover:opacity-100 blur-md transition-all duration-300" />
                </a>
              </Button>
              <span className="text-xs text-slate-400">
                Check out my other projects
              </span>
            </div>

            <Separator orientation="vertical" className="h-8 bg-slate-700" />

            <div className="flex flex-col items-center">
              <Button
                variant="ghost"
                size="lg"
                asChild
                className="relative group bg-slate-900/10 hover:bg-slate-800/50 text-slate-300 hover:text-pink-300 transition-all duration-300"
              >
                <a
                  href="https://www.linkedin.com/in/shardendumishra22/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3"
                >
                  <Linkedin className="w-5 h-5" />
                  <span>LinkedIn</span>
                  <div className="absolute -inset-1 bg-pink-500/20 rounded-lg opacity-0 group-hover:opacity-100 blur-md transition-all duration-300" />
                </a>
              </Button>
              <span className="text-xs text-slate-400">
                Connect with me on LinkedIn
              </span>
            </div>

          </div>

          <div className="relative text-sm text-slate-400 flex items-center gap-3">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>Made with</span>
            <Heart className="w-5 h-5 text-pink-400 fill-pink-400" />
            <span>by Shardendu Mishra</span>
            <Sparkles className="w-4 h-4 text-pink-400" />
          </div>
        </div>
      </div>

      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="absolute w-32 h-32 bg-purple-500/5 rounded-full blur-xl"
          style={{
            left: `${i * 30}%`,
            top: `${i * 20}%`,
            opacity: 0.3 * (i + 1), // Adjust opacity for more glow effect
          }}
        />
      ))}
    </footer>
  );
};

export default Footer;
