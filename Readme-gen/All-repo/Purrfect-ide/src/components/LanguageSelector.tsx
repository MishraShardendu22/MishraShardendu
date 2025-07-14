"use client";

import { LANGUAGE_CONFIG } from '@/app/(root)/constant';
import { useCodeEditorStore } from '@/app/(root)/store/useCodeEditor';
import useMounted from '@/hooks/useMounted';
import React from 'react';
import Image from 'next/image';
import { Lock } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface LanguageSelectorProps {
  hasAccess: boolean;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ hasAccess }) => {
  const { language, setLanguage } = useCodeEditorStore();
  const mounted = useMounted();

  if (!mounted) return null;

  const langArray = Object.values(LANGUAGE_CONFIG);

  const handleValueChange = (value: string) => {
    if (hasAccess || value === 'javascript') {
      setLanguage(value);
    }
  };

  return (
    <Select value={language} onValueChange={handleValueChange}>
      <SelectTrigger className="w-56 h-10 px-3">
        <SelectValue>
          <div className="flex items-center">
            <div className="w-5 h-5 relative">
              <Image 
                src={LANGUAGE_CONFIG[language].logoPath} 
                alt={`${LANGUAGE_CONFIG[language].label} logo`}
                fill
                className="object-contain"
              />
            </div>
            <span className="ml-3 font-medium">{LANGUAGE_CONFIG[language].label}</span>
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="w-56">
        {langArray.map((lang) => {
          const isLocked = !hasAccess && lang.id !== 'javascript';
          
          return (
            <TooltipProvider key={lang.id}>
              <Tooltip delayDuration={300}>
                <TooltipTrigger asChild>
                  <div className="relative">
                    <SelectItem
                      value={lang.id}
                      disabled={isLocked}
                      className={`
                        flex items-center py-2.5 px-3
                        ${isLocked ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
                        ${language === lang.id ? 'bg-secondary' : 'hover:bg-secondary/50'}
                      `}
                    >
                      <div className="flex items-center flex-1 min-w-0">
                        <div className="w-5 h-5 relative flex-shrink-0">
                          <Image 
                            src={lang.logoPath} 
                            alt={`${lang.label} logo`}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <span className="ml-3 truncate">{lang.label}</span>
                      </div>
                    </SelectItem>
                  </div>
                </TooltipTrigger>
                {isLocked && (
  <TooltipContent side="right" className="bg-popover border border-border flex items-center">
    <p className="text-red-600 text-sm">
      Upgrade to access this language
    </p>
    <Lock className="w-3.5 h-3.5 ml-2 text-muted-foreground" />
  </TooltipContent>
)}

              </Tooltip>
            </TooltipProvider>
          );
        })}
      </SelectContent>
    </Select>
  );
};

export default LanguageSelector;
