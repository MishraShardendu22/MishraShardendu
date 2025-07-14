'use client';
import { X } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { Button } from "@/components/ui/button";

interface SearchResetProps {
  onReset: () => void;
}

const Search_Reset = ({ onReset }: SearchResetProps) => {
  return (
    <Link href="/">
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={onReset}
        className="text-white hover:bg-white/10"
      >
        <X className="h-5 w-5" />
      </Button>
    </Link>
  );
};

export default Search_Reset;