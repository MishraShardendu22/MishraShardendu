import React from 'react';
import { Loader2 } from 'lucide-react';

const Loading = () => {
 return (
  <div className="flex min-h-[400px] w-full flex-col items-center justify-center space-y-4">
   <div className="relative">
    <div className="h-16 w-16">
     <Loader2 className="h-16 w-16 animate-spin text-primary" />
    </div>
    <div className="absolute inset-0 h-16 w-16 animate-pulse rounded-full bg-primary/10" />
   </div>
  </div>
 );
};

export default Loading;
