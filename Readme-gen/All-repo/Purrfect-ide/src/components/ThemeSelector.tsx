"use client";

import React from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { THEMES } from '@/app/(root)/constant';
import { useCodeEditorStore } from '@/app/(root)/store/useCodeEditor';
import useMounted from '@/hooks/useMounted';


const ThemeSelector = () => {
  const { theme, setTheme } = useCodeEditorStore();

  const currentTheme = THEMES.find((t) => {
    return t.id === theme
  });
  
  const mounted = useMounted();
  if (!mounted) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className="w-[200px] justify-between items-center font-medium"
        >
          <div className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full border border-gray-300" 
              style={{ backgroundColor: currentTheme?.color }}
            />
            {currentTheme?.label || "Select theme"}
          </div>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[200px]">
        {THEMES.map((t) => (
          <DropdownMenuItem
            key={t.id}
            className={cn(
              "flex items-center justify-between cursor-pointer",
              theme === t.id && "bg-accent"
            )}
            onClick={() => setTheme(t.id)}
          >
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full border border-gray-300" 
                style={{ backgroundColor: t.color }}
              />
              <span>{t.label}</span>
            </div>
            {theme === t.id && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSelector;
